'use client'

import { useState, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkDirective from 'remark-directive'
import rehypeRaw from 'rehype-raw'
import remarkBreaks from 'remark-breaks'
import {
    FileText,
    Save,
    AlertCircle,
    CheckCircle,
    Edit3,
    Eye,
    Plus,
    Trash2,
    MessageSquare,
    AlertTriangle,
    Clock,
    Ban,
    X,
    Hash,
    Tag,
    Folder
} from 'lucide-react'
import styles from './index.module.css'
import '@/utils/custom-directive/github-markdown.css'
import "@/utils/custom-directive/index.css";

type Action = {
    id: string
    type: 'VERBAL' | 'WARN' | 'TIMEOUT' | 'LOCALBAN'
    duration: string | null
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
}

type Props = {
    rule: Rule
    categories: Category[]
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
        default:
            return null
    }
}

export default function RuleEditor({ rule, categories }: Props) {
    const [editData, setEditData] = useState({
        rule: rule.rule,
        name: rule.name,
        content: rule.content,
        examples: rule.examples,
        categoryId: rule.categoryId,
        punishments: rule.punishments.map(p => ({
            id: p.id,
            name: p.name,
            index: p.index,
            actions: p.actions.map(a => ({
                id: a.id,
                type: a.type,
                duration: a.duration || ''
            }))
        }))
    })

    const [activeSection, setActiveSection] = useState<'content' | 'examples' | 'punishments'>('content')
    const [isSaving, setIsSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    const contentTextareaRef = useRef<HTMLTextAreaElement>(null)
    const contentPreviewRef = useRef<HTMLDivElement>(null)
    const examplesTextareaRef = useRef<HTMLTextAreaElement>(null)
    const examplesPreviewRef = useRef<HTMLDivElement>(null)

    const handleScroll = (textareaRef: React.RefObject<HTMLTextAreaElement>, previewRef: React.RefObject<HTMLDivElement>) => {
        if (textareaRef.current && previewRef.current) {
            const textarea = textareaRef.current
            const preview = previewRef.current
            const scrollPercentage = textarea.scrollTop / (textarea.scrollHeight - textarea.clientHeight)
            preview.scrollTop = scrollPercentage * (preview.scrollHeight - preview.clientHeight)
        }
    }

    const sortedCategories = [...categories].sort((a, b) => a.index - b.index)

    const saveRule = async () => {
        setIsSaving(true)
        setError(null)
        setSuccess(null)

        if (!editData.rule.trim() || !editData.name.trim() || !editData.content.trim() ||
            !editData.examples.trim() || !editData.categoryId) {
            setError('All fields are required and cannot be empty')
            setIsSaving(false)
            return
        }

        const invalidPunishments = editData.punishments.filter(p => !p.name.trim())
        if (invalidPunishments.length > 0) {
            setError('All punishments must have a name')
            setIsSaving(false)
            return
        }

        try {
            const response = await fetch(`/api/rules/${rule.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    rule: editData.rule.trim(),
                    name: editData.name.trim(),
                    content: editData.content.trim(),
                    examples: editData.examples.trim(),
                    categoryId: editData.categoryId,
                    punishments: editData.punishments.map(p => ({
                        name: p.name.trim(),
                        index: p.index,
                        actions: p.actions.map(a => ({
                            type: a.type,
                            duration: a.duration.trim() || null
                        }))
                    }))
                }),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Failed to save rule')
            }

            setSuccess('Rule saved successfully!')
            setTimeout(() => setSuccess(null), 3000)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred')
        } finally {
            setIsSaving(false)
        }
    }

    const addPunishment = () => {
        setEditData(prev => ({
            ...prev,
            punishments: [...prev.punishments, {
                id: `temp-${Date.now()}`,
                name: '',
                index: prev.punishments.length + 1,
                actions: []
            }]
        }))
    }

    const updatePunishment = (punishmentIndex: number, field: string, value: any) => {
        setEditData(prev => ({
            ...prev,
            punishments: prev.punishments.map((p, i) =>
                i === punishmentIndex ? { ...p, [field]: value } : p
            )
        }))
    }

    const addAction = (punishmentIndex: number) => {
        setEditData(prev => ({
            ...prev,
            punishments: prev.punishments.map((p, i) =>
                i === punishmentIndex
                    ? { ...p, actions: [...p.actions, { id: `temp-action-${Date.now()}`, type: 'VERBAL' as const, duration: '' }] }
                    : p
            )
        }))
    }
    const updateAction = (punishmentIndex: number, actionIndex: number, field: string, value: any) => {
        setEditData(prev => ({
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
        setEditData(prev => ({
            ...prev,
            punishments: prev.punishments.map((p, i) =>
                i === punishmentIndex
                    ? { ...p, actions: p.actions.filter((_, j) => j !== actionIndex) }
                    : p
            )
        }))
    }

    const removePunishment = (index: number) => {
        setEditData(prev => ({
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

            {success && (
                <div className={styles.success}>
                    <CheckCircle size={18} />
                    <span>{success}</span>
                </div>
            )}

            {/* Header */}
            <div className={styles.header}>
                <div className={styles.headerLeft}>
                    <FileText size={28} />
                    <div>
                        <h1>Edit Rule</h1>
                        <p className={styles.subtitle}>Rule {rule.rule} - {rule.name}</p>
                    </div>
                </div>
                <button
                    onClick={saveRule}
                    disabled={isSaving}
                    className={`${styles.button} ${styles.buttonPrimary}`}
                >
                    <Save size={18} />
                    {isSaving ? 'Saving...' : 'Save Rule'}
                </button>
            </div>

            {/* Basic Info Panel */}
            <div className={styles.panel}>
                <div className={styles.panelHeader}>
                    <FileText size={20} />
                    <h3>Rule Information</h3>
                </div>
                <div className={styles.formSection}>
                    <div className={styles.formGrid}>
                        <div className={styles.formGroup}>
                            <label>
                                <Hash size={14} />
                                Rule Number
                            </label>
                            <input
                                type="text"
                                value={editData.rule}
                                onChange={(e) => setEditData(prev => ({ ...prev, rule: e.target.value }))}
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>
                                <Tag size={14} />
                                Rule Name
                            </label>
                            <input
                                type="text"
                                value={editData.name}
                                onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>
                                <Folder size={14} />
                                Category
                            </label>
                            <select
                                value={editData.categoryId}
                                onChange={(e) => setEditData(prev => ({ ...prev, categoryId: e.target.value }))}
                                className={styles.select}
                            >
                                {sortedCategories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section Tabs */}
            <div className={styles.tabs}>
                <button
                    onClick={() => setActiveSection('content')}
                    className={`${styles.tab} ${activeSection === 'content' ? styles.tabActive : ''}`}
                >
                    <Edit3 size={16} />
                    Content
                </button>
                <button
                    onClick={() => setActiveSection('examples')}
                    className={`${styles.tab} ${activeSection === 'examples' ? styles.tabActive : ''}`}
                >
                    <FileText size={16} />
                    Examples
                </button>
                <button
                    onClick={() => setActiveSection('punishments')}
                    className={`${styles.tab} ${activeSection === 'punishments' ? styles.tabActive : ''}`}
                >
                    <AlertTriangle size={16} />
                    Punishments
                    <span className={styles.badge}>{editData.punishments.length}</span>
                </button>
            </div>

            {/* Content Section */}
            {activeSection === 'content' && (
                <div className={styles.editorContainer}>
                    <div className={styles.editorColumn}>
                        <div className={styles.editorHeader}>
                            <Edit3 size={16} />
                            <h4>Edit</h4>
                        </div>
                        {/*// @ts-ignore*/}
                        <textarea onScroll={() => handleScroll(contentTextareaRef, contentPreviewRef)}
                            ref={contentTextareaRef}
                            value={editData.content}
                            onChange={(e) => setEditData(prev => ({ ...prev, content: e.target.value }))}
                            placeholder="Enter rule content in markdown..."
                            className={styles.textarea}
                        />
                    </div>
                    <div className={styles.editorColumn}>
                        <div className={styles.editorHeader}>
                            <Eye size={16} />
                            <h4>Preview</h4>
                        </div>
                        <div ref={contentPreviewRef} className={`markdown-body ${styles.preview}`}>
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm, remarkBreaks, remarkDirective]}
                                rehypePlugins={[rehypeRaw]}
                            >
                                {editData.content}
                            </ReactMarkdown>
                        </div>
                    </div>
                </div>
            )}

            {/* Examples Section */}
            {activeSection === 'examples' && (
                <div className={styles.editorContainer}>
                    <div className={styles.editorColumn}>
                        <div className={styles.editorHeader}>
                            <Edit3 size={16} />
                            <h4>Edit</h4>
                        </div>
                        {/*// @ts-ignore*/}
                        <textarea onScroll={() => handleScroll(examplesTextareaRef, examplesPreviewRef)}
                            ref={examplesTextareaRef}
                            value={editData.examples}
                            onChange={(e) => setEditData(prev => ({ ...prev, examples: e.target.value }))}
                            placeholder="Enter rule examples in markdown..."
                            className={styles.textarea}
                        />
                    </div>
                    <div className={styles.editorColumn}>
                        <div className={styles.editorHeader}>
                            <Eye size={16} />
                            <h4>Preview</h4>
                        </div>
                        <div ref={examplesPreviewRef} className={`markdown-body ${styles.preview}`}>
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm, remarkBreaks, remarkDirective]}
                                rehypePlugins={[rehypeRaw]}
                            >
                                {editData.examples}
                            </ReactMarkdown>
                        </div>
                    </div>
                </div>
            )}

            {/* Punishments Section */}
            {activeSection === 'punishments' && (
                <div className={styles.panel}>
                    <div className={styles.panelHeader}>
                        <AlertTriangle size={20} />
                        <h3>Punishments</h3>
                        <button
                            onClick={addPunishment}
                            className={`${styles.button} ${styles.buttonPrimary} ${styles.buttonSmall}`}
                        >
                            <Plus size={14} />
                            Add Punishment
                        </button>
                    </div>

                    {editData.punishments.length === 0 ? (
                        <div className={styles.emptyState}>
                            <AlertTriangle size={48} />
                            <h3>No punishments defined</h3>
                            <p>Add punishments to define consequences for this rule.</p>
                        </div>
                    ) : (
                        <div className={styles.tableContainer}>
                            <table className={styles.table}>
                                <thead>
                                <tr>
                                    <th><span>Level</span></th>
                                    <th><span>Name</span></th>
                                    <th><span>Actions</span></th>
                                    <th><span>Manage</span></th>
                                </tr>
                                </thead>
                                <tbody>
                                {editData.punishments.map((punishment, punishmentIndex) => (
                                    <tr key={punishment.id}>
                                        <td>
                                            <input
                                                type="number"
                                                value={punishment.index}
                                                onChange={(e) => updatePunishment(punishmentIndex, 'index', parseInt(e.target.value) || 0)}
                                                className={styles.inputSmall}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                value={punishment.name}
                                                onChange={(e) => updatePunishment(punishmentIndex, 'name', e.target.value)}
                                                placeholder="Punishment name"
                                                className={styles.input}
                                            />
                                        </td>
                                        <td>
                                            <div className={styles.actionsCell}>
                                                <button
                                                    type="button"
                                                    onClick={() => addAction(punishmentIndex)}
                                                    className={`${styles.button} ${styles.buttonSmall}`}
                                                >
                                                    <Plus size={12} />
                                                    Add Action
                                                </button>
                                                {punishment.actions.map((action, actionIndex) => (
                                                    <div key={action.id} className={styles.actionRow}>
                                                        <select
                                                            value={action.type}
                                                            onChange={(e) => updateAction(punishmentIndex, actionIndex, 'type', e.target.value)}
                                                            className={styles.select}
                                                        >
                                                            <option value="VERBAL">Verbal</option>
                                                            <option value="WARN">Warn</option>
                                                            <option value="TIMEOUT">Timeout</option>
                                                            <option value="LOCALBAN">Local Ban</option>
                                                        </select>
                                                        <input
                                                            type="text"
                                                            value={action.duration}
                                                            onChange={(e) => updateAction(punishmentIndex, actionIndex, 'duration', e.target.value)}
                                                            placeholder="Duration"
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
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => removePunishment(punishmentIndex)}
                                                className={`${styles.button} ${styles.buttonDanger}`}
                                            >
                                                <Trash2 size={14} />
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}