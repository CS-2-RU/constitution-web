'use client'

import { useState, useEffect } from 'react'
import { useModalStore } from '@/lib/store/modalStore'
import type { Rule } from '@/lib/store/modalStore'
import styles from './index.module.css';
import {Search} from "lucide-react";

type Category = {
    id: string
    name: string
    index: number
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
    const { openModal } = useModalStore()

    // Sort categories by index
    const sortedCategories = [...categories].sort((a, b) => a.index - b.index)

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
        openModal(rule)
        setSearchTerm('')
        setShowSearchResults(false)
    }

    return (
        <div className={styles.container}>
            <div className={styles.searchWrapper}>
                <div className={styles.search}>
                    <label htmlFor="search">
                        <Search size={14} strokeWidth={2.5} />
                    </label>
                    <input
                        id={'search'}
                        type="text"
                        placeholder="Поиск"
                        autoComplete="off"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {showSearchResults && (
                    <div className={styles.results}>
                        {searchResults.length === 0 ? (
                            <div className={styles.noFound}>
                                Нет результатов
                            </div>
                        ) : (
                            searchResults.map((rule) => (
                                <div
                                    key={rule.id}
                                    onClick={() => handleSearchResultClick(rule)}
                                    className={styles.result}
                                >
                                    <div className={styles.top}>
                                        <span className={styles.ruleR}>{rule.rule}</span>
                                        <span className={styles.nameR}>{rule.name}</span>
                                    </div>
                                    {/*// @ts-ignore*/}
                                    <span className={styles.categoryR}>{rule.category.name}</span>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>

            <div className={styles.categories}>
                {sortedCategories.length === 0 ? (
                    <div>No categories available</div>
                ) : (
                    <ul className={styles.ul}>
                        {sortedCategories.map((category) => (
                            <button
                                key={category.id}
                                className={`${styles.category} ${category.name === selectedCategory ? styles.active : ''}`}
                                onClick={() => onCategorySelect(category.name)}
                            >
                                {category.name}
                            </button>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}