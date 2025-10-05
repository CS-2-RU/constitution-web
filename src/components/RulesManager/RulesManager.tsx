'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
    BookOpen,
    Plus,
    Trash2,
    Edit,
    Settings,
    AlertCircle,
    FileText,
    Folder,
    MessageSquare,
    AlertTriangle,
    Clock,
    Ban,
    X,
    ChevronDown,
    ChevronUp,
    Save,
    Shield
} from 'lucide-react'
import styles from './index.module.css'

type Action = {
    type: 'VERBAL' | 'WARN' | 'TIMEOUT' | 'LOCALBAN' | 'OLD'
    duration: string
}

type Punishment = {
    id: string
    name: string
    index: number
    actions: Action[]
}

type Category = {
    id: string
    name: string
    index: number
}

type Rule = {
    id: string
    rule: string
    name: string
    content: string
    examples: string
    categoryId: string
    category: Category
    punishments: Punishment[]
    createdAt: Date
    updatedAt: Date
}

type Props = {
    initialRules: Rule[]
    initialCategories: Category[]
}

const getActionIcon = (type: string) => {
    switch (type) {
        case 'VERBAL':
            return <MessageSquare size={14} />
        case 'WARN':
            return <AlertTriangle size={14} />
        case 'TIMEOUT':
            return <Clock size={14} />
        case 'LOCALBAN':
            return <Ban size={14} />
        case 'OLD':
            return <Shield size={14} />
        default:
            return null
    }
}

// Natural sort function for rule numbers
const sortRulesByNumber = (a: Rule, b: Rule) => {
    const aParts = a.rule.split('.').map(Number)
    const bParts = b.rule.split('.').map(Number)

    for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
        const aNum = aParts[i] || 0
        const bNum = bParts[i] || 0

        if (aNum !== bNum) {
            return aNum - bNum
        }
    }

    return 0
}

export default function RulesManager({ initialRules, initialCategories }: Props) {
    const [rules, setRules] = useState<Rule[]>(initialRules)
    const [categories, setCategories] = useState<Category[]>(initialCategories)
    const [isDeleting, setIsDeleting] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [showCreateForm, setShowCreateForm] = useState(false)
    const [showCategoryManager, setShowCategoryManager] = useState(false)
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())
    const [createData, setCreateData] = useState({
        rule: '',
        name: '',
        content: '',
        examples: '',
        categoryId: '',
        punishments: [] as Array<{
            name: string
            index: number
            actions: Array<{type: 'VERBAL' | 'WARN' | 'TIMEOUT' | 'LOCALBAN' | 'OLD', duration: string}>
        }>
    })
    const [categoryData, setCategoryData] = useState({
        name: '',
        index: 0
    })
    const [editingCategory, setEditingCategory] = useState<Category | null>(null)

    const rulesByCategory = rules.reduce((acc, rule) => {
        const categoryName = rule.category.name
        if (!acc[categoryName]) {
            acc[categoryName] = []
        }
        acc[categoryName].push(rule)
        return acc
    }, {} as Record<string, Rule[]>)

    // Sort rules within each category
    Object.keys(rulesByCategory).forEach(categoryName => {
        rulesByCategory[categoryName].sort(sortRulesByNumber)
    })

    const sortedCategories = [...categories].sort((a, b) => a.index - b.index)

    const toggleCategory = (categoryId: string) => {
        setExpandedCategories(prev => {
            const newSet = new Set(prev)
            if (newSet.has(categoryId)) {
                newSet.delete(categoryId)
            } else {
                newSet.add(categoryId)
            }
            return newSet
        })
    }

    const deleteRule = async (ruleId: string) => {
        if (!confirm('Are you sure you want to delete this rule? This action cannot be undone.')) {
            return
        }

        setIsDeleting(ruleId)
        setError(null)

        try {
            const response = await fetch(`/api/rules/${ruleId}`, {
                method: 'DELETE',
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Failed to delete rule')
            }

            setRules(rules.filter(r => r.id !== ruleId))
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred')
        } finally {
            setIsDeleting(null)
        }
    }

    const createRule = async () => {
        setError(null)

        if (!createData.rule.trim() || !createData.name.trim() || !createData.content.trim() ||
            !createData.examples.trim() || !createData.categoryId) {
            setError('All fields are required and cannot be empty')
            return
        }

        try {
            const response = await fetch('/api/rules', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(createData),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Failed to create rule')
            }

            const newRule = await response.json()
            setRules([...rules, newRule])
            setShowCreateForm(false)
            setCreateData({
                rule: '',
                name: '',
                content: '',
                examples: '',
                categoryId: '',
                punishments: []
            })
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred')
        }
    }

    const createCategory = async () => {
        setError(null)

        if (!categoryData.name.trim()) {
            setError('Category name is required')
            return
        }

        try {
            const response = await fetch('/api/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(categoryData),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Failed to create category')
            }

            const newCategory = await response.json()
            setCategories([...categories, newCategory])
            setCategoryData({ name: '', index: 0 })
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred')
        }
    }

    const updateCategory = async () => {
        if (!editingCategory) return

        setError(null)

        if (!categoryData.name.trim()) {
            setError('Category name is required')
            return
        }

        try {
            const response = await fetch(`/api/categories/${editingCategory.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(categoryData),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Failed to update category')
            }

            const updatedCategory = await response.json()
            setCategories(categories.map(c => c.id === updatedCategory.id ? updatedCategory : c))
            setEditingCategory(null)
            setCategoryData({ name: '', index: 0 })
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred')
        }
    }

    const deleteCategory = async (categoryId: string) => {
        if (!confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
            return
        }

        setError(null)

        try {
            const response = await fetch(`/api/categories/${categoryId}`, {
                method: 'DELETE',
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Failed to delete category')
            }

            setCategories(categories.filter(c => c.id !== categoryId))
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred')
        }
    }

    const startEditCategory = (category: Category) => {
        setEditingCategory(category)
        setCategoryData({ name: category.name, index: category.index })
    }

    const cancelEditCategory = () => {
        setEditingCategory(null)
        setCategoryData({ name: '', index: 0 })
    }

    const addPunishment = () => {
        setCreateData(prev => ({
            ...prev,
            punishments: [...prev.punishments, {
                name: '',
                index: prev.punishments.length + 1,
                actions: []
            }]
        }))
    }

    const updatePunishment = (punishmentIndex: number, field: string, value: any) => {
        setCreateData(prev => ({
            ...prev,
            punishments: prev.punishments.map((p, i) =>
                i === punishmentIndex ? { ...p, [field]: value } : p
            )
        }))
    }

    const addAction = (punishmentIndex: number) => {
        setCreateData(prev => ({
            ...prev,
            punishments: prev.punishments.map((p, i) =>
                i === punishmentIndex
                    ? { ...p, actions: [...p.actions, { type: 'VERBAL' as const, duration: '' }] }
                    : p
            )
        }))
    }

    const updateAction = (punishmentIndex: number, actionIndex: number, field: string, value: any) => {
        setCreateData(prev => ({
            ...prev,
            punishments: prev.punishments.map((p, i) =>
                i === punishmentIndex
                    ? {
                        ...p,
                        actions: p.actions.map((a, j) =>
                            j === actionIndex ? { ...a, [field]: value } : a
                        )
                    }
                    : p
            )
        }))
    }

    const removeAction = (punishmentIndex: number, actionIndex: number) => {
        setCreateData(prev => ({
            ...prev,
            punishments: prev.punishments.map((p, i) =>
                i === punishmentIndex
                    ? { ...p, actions: p.actions.filter((_, j) => j !== actionIndex) }
                    : p
            )
        }))
    }

    const removePunishment = (index: number) => {
        setCreateData(prev => ({
            ...prev,
            punishments: prev.punishments.filter((_, i) => i !== index)
        }))
    }

    return (
        <div className={styles.container}>
            {error && (
                <div className={styles.error}>
                    <AlertCircle size={18} />
                    <span>{error}</span>
                </div>
            )}

            <div className={styles.header}>
                <div className={styles.headerLeft}>
                    <BookOpen size={28} />
                    <div>
                        <h1>Rules Management</h1>
                        <p className={styles.subtitle}>{rules.length} rules across {categories.length} categories</p>
                    </div>
                </div>
                <div className={styles.headerActions}>
                    <button
                        onClick={() => setShowCategoryManager(!showCategoryManager)}
                        className={`${styles.button} ${styles.buttonSecondary}`}
                    >
                        <Settings size={18} />
                        {showCategoryManager ? 'Hide' : 'Manage'} Categories
                    </button>
                    <button
                        onClick={() => setShowCreateForm(!showCreateForm)}
                        className={`${styles.button} ${styles.buttonPrimary}`}
                    >
                        <Plus size={18} />
                        {showCreateForm ? 'Cancel' : 'Add Rule'}
                    </button>
                </div>
            </div>

            {/* Category Manager */}
            {showCategoryManager && (
                <div className={styles.panel}>
                    <div className={styles.panelHeader}>
                        <Folder size={20} />
                        <h3>Category Management</h3>
                    </div>

                    <div className={styles.formSection}>
                        <h4>{editingCategory ? 'Edit Category' : 'Create New Category'}</h4>
                        <div className={styles.formGrid}>
                            <div className={styles.formGroup}>
                                <label>Name</label>
                                <input
                                    type="text"
                                    value={categoryData.name}
                                    onChange={(e) => setCategoryData(prev => ({ ...prev, name: e.target.value }))}
                                    placeholder="Category name"
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Display Order</label>
                                <input
                                    type="number"
                                    value={categoryData.index}
                                    onChange={(e) => setCategoryData(prev => ({ ...prev, index: parseInt(e.target.value) || 0 }))}
                                    placeholder="0"
                                    className={styles.input}
                                />
                            </div>
                        </div>
                        <div className={styles.formActions}>
                            {editingCategory ? (
                                <>
                                    <button onClick={updateCategory} className={`${styles.button} ${styles.buttonPrimary}`}>
                                        <Save size={16} />
                                        Update Category
                                    </button>
                                    <button onClick={cancelEditCategory} className={`${styles.button} ${styles.buttonSecondary}`}>
                                        <X size={16} />
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <button onClick={createCategory} className={`${styles.button} ${styles.buttonPrimary}`}>
                                    <Plus size={16} />
                                    Create Category
                                </button>
                            )}
                        </div>
                    </div>

                    <div className={styles.tableContainer}>
                        <table className={styles.table}>
                            <thead>
                            <tr>
                                <th><span>Index</span></th>
                                <th><span>Name</span></th>
                                <th><span>Rules Count</span></th>
                                <th><span>Actions</span></th>
                            </tr>
                            </thead>
                            <tbody>
                            {sortedCategories.map((category) => {
                                const rulesCount = rules.filter(r => r.categoryId === category.id).length
                                return (
                                    <tr key={category.id}>
                                        <td>{category.index}</td>
                                        <td className={styles.categoryName}>
                                            <Folder size={16} />
                                            {category.name}
                                        </td>
                                        <td>
                                            <span className={styles.badge}>{rulesCount}</span>
                                        </td>
                                        <td>
                                            <div className={styles.actions}>
                                                <button
                                                    onClick={() => startEditCategory(category)}
                                                    className={`${styles.actionButton} ${styles.actionEdit}`}
                                                >
                                                    <Edit size={14} />
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => deleteCategory(category.id)}
                                                    disabled={rulesCount > 0}
                                                    className={`${styles.actionButton} ${styles.actionDelete}`}
                                                    title={rulesCount > 0 ? 'Cannot delete category with rules' : ''}
                                                >
                                                    <Trash2 size={14} />
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Create Rule Form */}
            {showCreateForm && (
                <div className={styles.panel}>
                    <div className={styles.panelHeader}>
                        <FileText size={20} />
                        <h3>Create New Rule</h3>
                    </div>

                    <div className={styles.formSection}>
                        <div className={styles.formGrid}>
                            <div className={styles.formGroup}>
                                <label>Rule Number</label>
                                <input
                                    type="text"
                                    value={createData.rule}
                                    onChange={(e) => setCreateData(prev => ({ ...prev, rule: e.target.value }))}
                                    placeholder="e.g., 1.1"
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Rule Name</label>
                                <input
                                    type="text"
                                    value={createData.name}
                                    onChange={(e) => setCreateData(prev => ({ ...prev, name: e.target.value }))}
                                    placeholder="Short rule name"
                                    className={styles.input}
                                />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label>Category</label>
                            <select
                                value={createData.categoryId}
                                onChange={(e) => setCreateData(prev => ({ ...prev, categoryId: e.target.value }))}
                                className={styles.select}
                            >
                                <option value="">Select a category</option>
                                {sortedCategories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label>Content (Markdown)</label>
                            <textarea
                                value={createData.content}
                                onChange={(e) => setCreateData(prev => ({ ...prev, content: e.target.value }))}
                                placeholder="Rule content in markdown..."
                                rows={5}
                                className={styles.textarea}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Examples (Markdown)</label>
                            <textarea
                                value={createData.examples}
                                onChange={(e) => setCreateData(prev => ({ ...prev, examples: e.target.value }))}
                                placeholder="Rule examples in markdown..."
                                rows={5}
                                className={styles.textarea}
                            />
                        </div>

                        <div className={styles.punishmentsSection}>
                            <div className={styles.sectionHeader}>
                                <label>Punishments</label>
                                <button
                                    type="button"
                                    onClick={addPunishment}
                                    className={`${styles.button} ${styles.buttonSmall}`}
                                >
                                    <Plus size={14} />
                                    Add Punishment
                                </button>
                            </div>

                            {createData.punishments.map((punishment, punishmentIndex) => (
                                <div key={punishmentIndex} className={styles.punishmentCard}>
                                    <div className={styles.punishmentHeader}>
                                        <div className={styles.formGrid}>
                                            <input
                                                type="text"
                                                placeholder="Punishment name (e.g., Light, Hard)"
                                                value={punishment.name}
                                                onChange={(e) => updatePunishment(punishmentIndex, 'name', e.target.value)}
                                                className={styles.input}
                                            />
                                            <input
                                                type="number"
                                                placeholder="Level"
                                                value={punishment.index}
                                                onChange={(e) => updatePunishment(punishmentIndex, 'index', parseInt(e.target.value) || 0)}
                                                className={styles.input}
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removePunishment(punishmentIndex)}
                                            className={`${styles.button} ${styles.buttonDanger}`}
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>

                                    <div className={styles.actionsSection}>
                                        <div className={styles.sectionHeader}>
                                            <strong>Actions</strong>
                                            <button
                                                type="button"
                                                onClick={() => addAction(punishmentIndex)}
                                                className={`${styles.button} ${styles.buttonSmall}`}
                                            >
                                                <Plus size={12} />
                                                Add Action
                                            </button>
                                        </div>

                                        {punishment.actions.map((action, actionIndex) => (
                                            <div key={actionIndex} className={styles.actionRow}>
                                                <select
                                                    value={action.type}
                                                    onChange={(e) => updateAction(punishmentIndex, actionIndex, 'type', e.target.value)}
                                                    className={styles.select}
                                                >
                                                    <option value="VERBAL">Verbal</option>
                                                    <option value="WARN">Warn</option>
                                                    <option value="TIMEOUT">Timeout</option>
                                                    <option value="LOCALBAN">Local Ban</option>
                                                    <option value="OLD">Old</option>
                                                </select>
                                                <input
                                                    type="text"
                                                    placeholder="Duration (optional)"
                                                    value={action.duration}
                                                    onChange={(e) => updateAction(punishmentIndex, actionIndex, 'duration', e.target.value)}
                                                    className={styles.input}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeAction(punishmentIndex, actionIndex)}
                                                    className={`${styles.iconButton} ${styles.buttonDanger}`}
                                                >
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className={styles.formActions}>
                            <button onClick={createRule} className={`${styles.button} ${styles.buttonPrimary}`}>
                                <Save size={16} />
                                Create Rule
                            </button>
                            <button onClick={() => setShowCreateForm(false)} className={`${styles.button} ${styles.buttonSecondary}`}>
                                <X size={16} />
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Rules Display */}
            {sortedCategories.length === 0 ? (
                <div className={styles.emptyState}>
                    <Folder size={48} />
                    <h3>No categories found</h3>
                    <p>Create your first category to get started!</p>
                </div>
            ) : (
                <div className={styles.rulesContainer}>
                    {sortedCategories.map((category) => {
                        const categoryRules = rulesByCategory[category.name] || []
                        const isExpanded = expandedCategories.has(category.id)

                        return (
                            <div key={category.id} className={styles.categorySection}>
                                <div
                                    className={styles.categoryHeader}
                                    onClick={() => toggleCategory(category.id)}
                                >
                                    <div className={styles.categoryTitle}>
                                        <Folder size={20} />
                                        <h2>{category.name}</h2>
                                        <span className={styles.badge}>{categoryRules.length}</span>
                                    </div>
                                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                </div>

                                {isExpanded && (
                                    categoryRules.length === 0 ? (
                                        <div className={styles.emptyCategory}>
                                            <FileText size={32} />
                                            <p>No rules in this category yet.</p>
                                        </div>
                                    ) : (
                                        <div className={styles.tableContainer}>
                                            <table className={styles.table}>
                                                <thead>
                                                <tr>
                                                    <th><span>Rule</span></th>
                                                    <th><span>Name</span></th>
                                                    <th><span>Punishments</span></th>
                                                    <th><span>Actions</span></th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {categoryRules.map((rule) => (
                                                    <tr key={rule.id}>
                                                        <td className={styles.ruleNumber}>{rule.rule}</td>
                                                        <td className={styles.ruleName}>{rule.name}</td>
                                                        <td>
                                                            {rule.punishments.length > 0 ? (
                                                                <div className={styles.punishmentsList}>
                                                                    {rule.punishments.map((p) => (
                                                                        <div key={p.id} className={styles.punishmentItem}>
                                                                            <div className={styles.punishmentName}>
                                                                                <strong>{p.name}</strong>
                                                                                <span className={styles.punishmentLevel}>Level {p.index}</span>
                                                                            </div>
                                                                            {p.actions.length > 0 && (
                                                                                <div className={styles.actionTags}>
                                                                                    {p.actions.map((a, i) => (
                                                                                        <span key={i} className={styles.actionTag}>
                                                                                                {getActionIcon(a.type)}
                                                                                            {a.type}
                                                                                            {a.duration && ` (${a.duration})`}
                                                                                            </span>
                                                                                    ))}
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            ) : (
                                                                <span className={styles.emptyValue}>No punishments</span>
                                                            )}
                                                        </td>
                                                        <td>
                                                            <div className={styles.actions}>
                                                                <Link href={`/rules-edit/${rule.id}`}>
                                                                    <button className={`${styles.actionButton} ${styles.actionEdit}`}>
                                                                        <Edit size={14} />
                                                                        Edit
                                                                    </button>
                                                                </Link>
                                                                <button
                                                                    onClick={() => deleteRule(rule.id)}
                                                                    disabled={isDeleting === rule.id}
                                                                    className={`${styles.actionButton} ${styles.actionDelete}`}
                                                                >
                                                                    <Trash2 size={14} />
                                                                    {isDeleting === rule.id ? 'Deleting...' : 'Delete'}
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )
                                )}
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}