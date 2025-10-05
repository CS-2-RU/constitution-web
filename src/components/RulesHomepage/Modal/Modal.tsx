'use client'

import {useEffect, useState} from 'react'
import {useModalStore} from '@/lib/store/modalStore'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkDirective from 'remark-directive'
import rehypeRaw from 'rehype-raw'
import remarkBreaks from 'remark-breaks'
import styles from './index.module.css'
import {customDirectives} from "@/utils/custom-directive";
import '@/utils/custom-directive/github-markdown.css'
import "@/utils/custom-directive/index.css";
import {Gavel, X} from 'lucide-react';

export default function Modal() {
    const {isOpen, rule, closeModal} = useModalStore()
    const [activeTab, setActiveTab] = useState<'rule' | 'examples'>('rule')

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
            setActiveTab('rule')
        } else {
            document.body.style.overflow = 'unset'
        }

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            closeModal()
        }
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
            default:
                return type
        }
    }
    const getActionCircle = (type: string) => {
        switch (type) {
            case 'VERBAL':
                return styles.verbal
            case 'WARN':
                return styles.warn
            case 'TIMEOUT':
                return styles.timeout
            case 'LOCALBAN':
                return styles.localban
            default:
                return type
        }
    }

    if (!isOpen || !rule) return null

    return (
        <div
            onClick={handleBackdropClick}
            className={styles.container}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={styles.inner}
            >
                <div className={styles.top}>
                    <div className={styles.topLeft}>
                        <h2>{rule.rule}: {rule.name}</h2>
                        {/*// @ts-ignore*/}
                        <span>Category: {rule.category.name}</span>
                    </div>
                    <div className={styles.topRight}>
                        <div className={styles.switch}>
                            <button
                                onClick={() => setActiveTab('rule')}
                                className={styles.button + ' ' + (activeTab === 'rule' ? styles.selectionActive : '')}
                            >
                                Правило
                            </button>
                            <button
                                onClick={() => setActiveTab('examples')}
                                className={styles.button + ' ' + (activeTab === 'examples' ? styles.selectionActive : '')}
                            >
                                Примеры
                            </button>
                        </div>
                        <button
                            onClick={closeModal}
                            className={styles.close}
                        >
                            <X/>
                        </button>
                    </div>
                </div>
                <div className={styles.content}>
                    <div className={styles.left}>
                        <div className={styles.punishmentHeader}>
                            <div className={styles.logo}>
                                <Gavel/>
                            </div>
                            <h3>
                                Наказания
                            </h3>
                        </div>

                        {rule.punishments.length === 0 ? (
                            <></>
                        ) : (
                            <table className={styles.table}>
                                <thead>
                                <tr>
                                    <th>
                                        Пункт
                                    </th>
                                    <th>
                                        Действия
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {rule.punishments.map((punishment, index) => (
                                    <tr className={styles.row} key={punishment.id}>
                                        <td>
                                            <span>
                                              {punishment.index}
                                            </span>
                                        </td>
                                        <td>
                                            {punishment.actions.length === 0 ? (
                                                <span>
                                                    No actions defined
                                                  </span>
                                            ) : (
                                                <>
                                                    {punishment.actions.map((action) => (
                                                        <div key={action.id} className={styles.punishment}>
                                                            <div className={styles.circle + ' ' + getActionCircle(action.type)}></div>
                                                            <span>{formatActionType(action.type)}</span>
                                                            {action.duration && (
                                                                <span>
                                                                    {' '}({action.duration})
                                                                </span>
                                                            )}
                                                        </div>
                                                    ))}
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                    <div className={styles.right}>
                        {activeTab === 'rule' && (
                            <div className="markdown-body">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm, remarkBreaks, remarkDirective, customDirectives]}
                                    rehypePlugins={[rehypeRaw]}
                                >
                                    {rule.content}
                                </ReactMarkdown>
                            </div>
                        )}

                        {activeTab === 'examples' && (
                            <div className="markdown-body">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm, remarkBreaks, remarkDirective, customDirectives]}
                                    rehypePlugins={[rehypeRaw]}
                                >
                                    {rule.examples}
                                </ReactMarkdown>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}