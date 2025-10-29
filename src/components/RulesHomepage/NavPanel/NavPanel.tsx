'use client'

import { useState, useEffect } from 'react'
import { Search, ChevronDown, ChevronUp } from "lucide-react"

type Category = {
    id: string
    name: string
    index: number
}

type Rule = {
    id: string
    rule: string
    name: string
    category: { name: string }
}

interface NavPanelProps {
    categories: Category[]
    selectedCategory: string
    onCategorySelect: (categoryName: string) => void
    rules: Rule[]
}

export default function NavPanel({ categories, selectedCategory, onCategorySelect, rules }: NavPanelProps) {
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState<Rule[]>([])
    const [showSearchResults, setShowSearchResults] = useState(false)
    const [isPortrait, setIsPortrait] = useState(false)
    const [isCollapsed, setIsCollapsed] = useState(true)

    const sortedCategories = [...categories].sort((a, b) => a.index - b.index)

    // Detect orientation
    useEffect(() => {
        const checkOrientation = () => {
            setIsPortrait(window.matchMedia("(orientation: portrait)").matches)
        }

        checkOrientation()
        window.addEventListener('resize', checkOrientation)

        return () => window.removeEventListener('resize', checkOrientation)
    }, [])

    useEffect(() => {
        if (searchTerm.trim()) {
            const filtered = rules.filter(rule =>
                rule.rule.toLowerCase().includes(searchTerm.toLowerCase()) ||
                rule.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            setSearchResults(filtered)
            setShowSearchResults(true)
        } else {
            setSearchResults([])
            setShowSearchResults(false)
        }
    }, [searchTerm, rules])

    const handleSearchResultClick = (rule: Rule) => {
        setSearchTerm('')
        setShowSearchResults(false)
    }

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed)
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: isPortrait ? (isCollapsed ? '0' : '1em') : '1em',
            background: 'var(--bg-2, #1a1a1a)',
            border: '1px solid var(--border-color-1, #333)',
            borderRadius: 'var(--radius-5, 12px)',
            padding: '1.5em',
            transition: 'gap 0.3s ease'
        }}>
            <div style={{ display: 'flex', position: 'relative' }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    padding: '0.75em',
                    borderRadius: '100px',
                    color: 'var(--color-3, #888)',
                    background: 'var(--bg-3, #252525)',
                    alignItems: 'center',
                    gap: '0.5em',
                    flex: 1
                }}>
                    <label htmlFor="search" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Search size={14} strokeWidth={2.5} />
                    </label>
                    <input
                        id="search"
                        type="text"
                        placeholder="Поиск"
                        autoComplete="off"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            all: 'unset',
                            background: 'transparent',
                            color: 'var(--color-1, #fff)',
                            border: 'none',
                            outline: 'none',
                            fontSize: '1rem',
                            flex: 1
                        }}
                    />
                    {isPortrait && (
                        <button
                            onClick={toggleCollapse}
                            aria-label={isCollapsed ? "Expand navigation" : "Collapse navigation"}
                            style={{
                                all: 'unset',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                cursor: 'pointer',
                                color: 'var(--color-3, #888)',
                                transition: 'color 0.2s',
                                padding: '0.25em'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-1, #fff)'}
                            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-3, #888)'}
                        >
                            {isCollapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                        </button>
                    )}
                </div>

                {showSearchResults && (
                    <div style={{
                        top: '120%',
                        background: 'var(--bg-3, #252525)',
                        position: 'absolute',
                        padding: '0.5em',
                        left: 0,
                        right: 0,
                        borderRadius: 'var(--radius-4, 8px)',
                        border: '1px solid var(--border-color-1, #333)',
                        display: 'flex',
                        flexDirection: 'column',
                        zIndex: 2
                    }}>
                        {searchResults.length === 0 ? (
                            <div style={{
                                color: 'var(--color-3, #888)',
                                textAlign: 'center',
                                fontSize: '0.9rem'
                            }}>
                                Нет результатов
                            </div>
                        ) : (
                            searchResults.map((rule) => (
                                <div
                                    key={rule.id}
                                    onClick={() => handleSearchResultClick(rule)}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        cursor: 'pointer',
                                        padding: '0.5em 0.75em',
                                        transition: 'background 0.2s',
                                        borderRadius: 'var(--radius-3, 6px)'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-4, #2a2a2a)'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                >
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25em' }}>
                                        <span style={{ color: 'var(--color-primary, #4a9eff)' }}>{rule.rule}</span>
                                        <span>{rule.name}</span>
                                    </div>
                                    <span style={{ color: 'var(--color-3, #888)', fontSize: '0.9rem' }}>
                                        {rule.category.name}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>

            {(!isPortrait || !isCollapsed) && (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {sortedCategories.length === 0 ? (
                        <div>No categories available</div>
                    ) : (
                        <ul style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1em',
                            flex: 1,
                            listStyle: 'none',
                            margin: 0,
                            padding: 0
                        }}>
                            {sortedCategories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => onCategorySelect(category.name)}
                                    style={{
                                        all: 'unset',
                                        cursor: 'pointer',
                                        padding: '1em',
                                        borderBottom: '1px solid var(--border-color-1, #333)',
                                        color: category.name === selectedCategory ? 'var(--color-1, #fff)' : 'var(--color-3, #888)',
                                        transition: 'color 0.2s',
                                        position: 'relative'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-1, #fff)'}
                                    onMouseLeave={(e) => {
                                        if (category.name !== selectedCategory) {
                                            e.currentTarget.style.color = 'var(--color-3, #888)'
                                        }
                                    }}
                                >
                                    <span style={{
                                        content: '',
                                        display: 'block',
                                        position: 'absolute',
                                        top: '30%',
                                        left: '-5px',
                                        bottom: '30%',
                                        width: '5px',
                                        transition: 'background 0.2s',
                                        borderRadius: 'var(--radius-1, 4px)',
                                        background: category.name === selectedCategory ? 'var(--color-primary, #4a9eff)' : 'transparent'
                                    }}></span>
                                    {category.name}
                                </button>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    )
}