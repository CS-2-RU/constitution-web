'use client'

import { useState, useEffect } from 'react'
import type { Rule } from '@/lib/store/modalStore'
import NavPanel from "@/components/RulesHomepage/NavPanel/NavPanel";
import MainPanel from "@/components/RulesHomepage/MainPanel/MainPanel";
import Modal from "@/components/RulesHomepage/Modal/Modal";
import styles from './index.module.css';

type Category = {
    id: string
    name: string
    index: number
}

export default function RulesHomepage() {
    const [rules, setRules] = useState<Rule[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [selectedCategory, setSelectedCategory] = useState<string>('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchRulesAndCategories()
    }, [])

    const fetchRulesAndCategories = async () => {
        try {
            setLoading(true)

            // Fetch rules
            const rulesResponse = await fetch('/api/rules/public')
            if (!rulesResponse.ok) {
                throw new Error('Failed to fetch rules')
            }
            const rulesData = await rulesResponse.json()

            // Fetch categories
            const categoriesResponse = await fetch('/api/rules/public', {
                method: 'POST'
            })
            if (!categoriesResponse.ok) {
                throw new Error('Failed to fetch categories')
            }
            const categoriesData = await categoriesResponse.json()

            setRules(rulesData)
            setCategories(categoriesData)

            // Set first category as default (sorted by index)
            if (categoriesData.length > 0 && !selectedCategory) {
                const sortedCategories = [...categoriesData].sort((a, b) => a.index - b.index)
                setSelectedCategory(sortedCategories[0].name)
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred')
        } finally {
            setLoading(false)
        }
    }

    // @ts-ignore
    const filteredRules = rules.filter(rule => rule.category.name === selectedCategory)

    if (loading) {
        return <div>Loading rules...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <main className={styles.main}>
            <NavPanel
                categories={categories}
                selectedCategory={selectedCategory}
                onCategorySelect={setSelectedCategory}
                rules={rules}
            />

            <MainPanel
                rules={filteredRules}
                categoryName={selectedCategory}
            />

            <Modal />
        </main>
    )
}