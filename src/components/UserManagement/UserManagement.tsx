'use client'

import { useState, useMemo } from 'react'
import { Shield, User, Crown, Ban, AlertCircle, Calendar, Mail, MessageSquare, Trash2, Search, X } from 'lucide-react'
import styles from './index.module.css'

type User = {
    id: string
    email: string
    name: string | null
    role: string
    discordId: string | null
    discordUsername: string | null
    createdAt: Date
}

type Props = {
    users: User[]
    currentUserRole: string
    currentUserId: string
}

const getRoleIcon = (role: string) => {
    switch (role) {
        case 'SUPERADMIN':
            return <Crown size={16} />
        case 'ADMIN':
            return <Shield size={16} />
        case 'USER':
            return <User size={16} />
        case 'DENIED':
            return <Ban size={16} />
        default:
            return <User size={16} />
    }
}

const getRoleColor = (role: string) => {
    switch (role) {
        case 'SUPERADMIN':
            return styles.roleSuperadmin
        case 'ADMIN':
            return styles.roleAdmin
        case 'USER':
            return styles.roleUser
        case 'DENIED':
            return styles.roleDenied
        default:
            return ''
    }
}

export default function UserManagement({ users, currentUserRole, currentUserId }: Props) {
    const [isUpdating, setIsUpdating] = useState<string | null>(null)
    const [isDeleting, setIsDeleting] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set(['SUPERADMIN', 'ADMIN', 'USER', 'DENIED']))

    const canModifyUser = (targetUser: User) => {
        if (currentUserRole === 'SUPERADMIN') {
            return true
        }

        if (currentUserRole === 'ADMIN') {
            return targetUser.role !== 'ADMIN' && targetUser.role !== 'SUPERADMIN'
        }

        return false
    }

    const getAvailableRoles = (targetUser: User) => {
        if (currentUserRole === 'SUPERADMIN') {
            return ['DENIED', 'USER', 'ADMIN', 'SUPERADMIN']
        }

        if (currentUserRole === 'ADMIN') {
            return ['DENIED', 'USER']
        }

        return []
    }

    const updateUserRole = async (userId: string, newRole: string) => {
        setIsUpdating(userId)
        setError(null)

        try {
            const response = await fetch('/api/users/update-role', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    newRole,
                }),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Failed to update user role')
            }

            window.location.reload()
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred')
        } finally {
            setIsUpdating(null)
        }
    }

    const deleteUser = async (userId: string, userEmail: string) => {
        if (!confirm(`Are you sure you want to delete user "${userEmail}"? This action cannot be undone.`)) {
            return
        }

        setIsDeleting(userId)
        setError(null)

        try {
            const response = await fetch('/api/users/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                }),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Failed to delete user')
            }

            window.location.reload()
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred')
        } finally {
            setIsDeleting(null)
        }
    }

    const toggleFilter = (role: string) => {
        setActiveFilters(prev => {
            const newFilters = new Set(prev)
            if (newFilters.has(role)) {
                newFilters.delete(role)
            } else {
                newFilters.add(role)
            }
            return newFilters
        })
    }

    const clearSearch = () => {
        setSearchQuery('')
    }

    const filteredUsers = useMemo(() => {
        return users.filter(user => {
            // Role filter
            if (!activeFilters.has(user.role)) {
                return false
            }

            // Search filter
            if (searchQuery.trim() === '') {
                return true
            }

            const query = searchQuery.toLowerCase()
            const matchesId = user.id.toLowerCase().includes(query)
            const matchesEmail = user.email.toLowerCase().includes(query)
            const matchesName = user.name?.toLowerCase().includes(query)
            const matchesDiscordUsername = user.discordUsername?.toLowerCase().includes(query)

            return matchesId || matchesEmail || matchesName || matchesDiscordUsername
        })
    }, [users, searchQuery, activeFilters])

    const allRoles = ['SUPERADMIN', 'ADMIN', 'USER', 'DENIED']

    return (
        <div className={styles.container}>
            {error && (
                <div className={styles.error}>
                    <AlertCircle size={18} />
                    <span>{error}</span>
                </div>
            )}

            <div className={styles.header}>
                <h2>User Management</h2>
                <span className={styles.userCount}>{filteredUsers.length} of {users.length} users</span>
            </div>

            <div className={styles.filterSection}>
                <div className={styles.searchWrapper}>
                    <Search size={18} className={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder="Search by ID, email, name, or Discord username..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={styles.searchInput}
                    />
                    {searchQuery && (
                        <button
                            onClick={clearSearch}
                            className={styles.clearButton}
                            aria-label="Clear search"
                        >
                            <X size={16} />
                        </button>
                    )}
                </div>

                <div className={styles.filterButtons}>
                    <span className={styles.filterLabel}>Show roles:</span>
                    {allRoles.map(role => (
                        <button
                            key={role}
                            onClick={() => toggleFilter(role)}
                            className={`${styles.filterButton} ${activeFilters.has(role) ? styles.filterButtonActive : ''} ${getRoleColor(role)}`}
                        >
                            {getRoleIcon(role)}
                            {role}
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                    <tr>
                        <th>
                            <span>
                                <Mail size={16} />
                                Email
                            </span>
                        </th>
                        <th>
                            <span>
                                <User size={16} />
                                Name
                            </span>
                        </th>
                        <th>
                            <span>
                                <MessageSquare size={16} />
                                Discord
                            </span>
                        </th>
                        <th>
                            <span>
                                <Shield size={16} />
                                Role
                            </span>
                        </th>
                        <th>
                            <span>
                                <Calendar size={16} />
                                Joined
                            </span>
                        </th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredUsers.length === 0 ? (
                        <tr>
                            <td colSpan={6} className={styles.noResults}>
                                <AlertCircle size={24} />
                                <span>No users found matching your criteria</span>
                            </td>
                        </tr>
                    ) : (
                        filteredUsers.map((user) => (
                            <tr key={user.id}>
                                <td className={styles.emailCell}>{user.email}</td>
                                <td>{user.name || <span className={styles.emptyValue}>—</span>}</td>
                                <td>
                                    {user.discordUsername ? (
                                        <div className={styles.discordInfo}>
                                            <span className={styles.discordUsername}>
                                                {user.discordUsername}
                                            </span>
                                            {user.discordId && (
                                                <span className={styles.discordId}>
                                                    ID: {user.discordId}
                                                </span>
                                            )}
                                        </div>
                                    ) : (
                                        <span className={styles.emptyValue}>—</span>
                                    )}
                                </td>
                                <td>
                                    <div className={styles.roleCell}>
                                        <span className={`${styles.roleBadge} ${getRoleColor(user.role)}`}>
                                            {getRoleIcon(user.role)}
                                            {user.role}
                                        </span>
                                        {user.id === currentUserId && (
                                            <span className={styles.youBadge}>You</span>
                                        )}
                                    </div>
                                </td>
                                <td className={styles.dateCell}>
                                    {new Date(user.createdAt).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </td>
                                <td>
                                    {canModifyUser(user) ? (
                                        <div className={styles.actions}>
                                            {getAvailableRoles(user).map((role) => (
                                                <button
                                                    key={role}
                                                    onClick={() => updateUserRole(user.id, role)}
                                                    disabled={isUpdating === user.id || user.role === role}
                                                    className={`${styles.actionButton} ${user.role === role ? styles.currentRole : ''} ${getRoleColor(role)}`}
                                                >
                                                    {getRoleIcon(role)}
                                                    {isUpdating === user.id ? 'Updating...' : role}
                                                </button>
                                            ))}
                                            <button
                                                onClick={() => deleteUser(user.id, user.email)}
                                                disabled={isDeleting === user.id || user.id === currentUserId}
                                                className={`${styles.actionButton} ${styles.deleteButton}`}
                                                title={user.id === currentUserId ? "You cannot delete yourself" : "Delete user"}
                                            >
                                                <Trash2 size={14} />
                                                {isDeleting === user.id ? 'Deleting...' : 'Delete'}
                                            </button>
                                        </div>
                                    ) : (
                                        <span className={styles.noPermissions}>No permissions</span>
                                    )}
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>

            <div className={styles.legend}>
                <h3>Role Permissions</h3>
                <div className={styles.legendItems}>
                    <div className={styles.legendItem}>
                        <span className={`${styles.roleBadge} ${styles.roleDenied}`}>
                            <Ban size={14} />
                            DENIED
                        </span>
                        <span>Cannot access the application</span>
                    </div>
                    <div className={styles.legendItem}>
                        <span className={`${styles.roleBadge} ${styles.roleUser}`}>
                            <User size={14} />
                            USER
                        </span>
                        <span>Basic application access</span>
                    </div>
                    <div className={styles.legendItem}>
                        <span className={`${styles.roleBadge} ${styles.roleAdmin}`}>
                            <Shield size={14} />
                            ADMIN
                        </span>
                        <span>Can manage DENIED/USER roles</span>
                    </div>
                    <div className={styles.legendItem}>
                        <span className={`${styles.roleBadge} ${styles.roleSuperadmin}`}>
                            <Crown size={14} />
                            SUPERADMIN
                        </span>
                        <span>Can manage all users and roles</span>
                    </div>
                </div>
            </div>
        </div>
    )
}