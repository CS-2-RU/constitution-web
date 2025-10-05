'use client'

import { useModalStore } from '@/lib/store/modalStore'
import type { Rule } from '@/lib/store/modalStore'
import styles from './index.module.css';

interface MainPanelProps {
    rules: Rule[]
    categoryName: string
}

export default function MainPanel({ rules, categoryName }: MainPanelProps) {
    const { openModal } = useModalStore()

    const formatActionText = (actions: any[]) => {
        if (!actions || actions.length === 0) return 'No actions'

        return actions.map(action => {
            const duration = action.duration ? ` (${action.duration})` : ''
            return `${action.type.toLocaleLowerCase()}${duration}`
        }).join(', ')
    }

    const formatActionType = (type: string) => {
        switch (type) {
            case 'VERBAL':
                return 'Словестное'
            case 'WARN':
                return 'Пред'
            case 'TIMEOUT':
                return 'Таймаут'
            case 'LOCALBAN':
                return 'Локал Бан'
            case 'OLD':
                return 'Обращение к модераторам и выше'
            default:
                return type
        }
    }

    // Natural sort function for rule numbers
    const sortRules = (a: Rule, b: Rule) => {
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

    if (!categoryName) {
        return (
            <div>
                <h2>Select a category to view rules</h2>
            </div>
        )
    }

    // Sort rules before rendering
    const sortedRules = [...rules].sort(sortRules)

    return (
        <div className={styles.main}>
            {sortedRules.length === 0 ? (
                <div>
                    <p>В текущей категории нет правил.</p>
                </div>
            ) : (
                <div className={styles.container}>
                    {sortedRules.map((rule) => (
                        <button
                            className={styles.rule}
                            key={rule.id}
                            onClick={() => openModal(rule)}
                        >
                            <div className={styles.top}>
                                <h2>
                                    {rule.rule}
                                </h2>
                                <h3>
                                    {rule.name}
                                </h3>
                            </div>

                            <div className={styles.punishments}>
                                {rule.punishments.length > 0 && (
                                    <div className={styles.punishmentsContainer}>
                                        {rule.punishments.length > 0 && rule.punishments[0].actions.map((action) => (
                                            <div className={styles.punishment} key={action.id}>
                                                <div className={styles.action + ' ' + styles[action.type.toLocaleLowerCase()]}></div>
                                                <span>{formatActionType(action.type)} {action.duration && <span>: {action.duration}</span>}</span>
                                            </div>
                                        ))}

                                        {rule.punishments.length > 1 && (
                                            <div className={styles.more}>
                                                +{rule.punishments.length - 1} наказани{rule.punishments.length > 2 ? 'й' : 'e'}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}