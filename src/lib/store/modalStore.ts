import { create } from 'zustand'

export type Action = {
    id: string
    type: 'VERBAL' | 'WARN' | 'TIMEOUT' | 'LOCALBAN'
    duration: string | null
}

export type Punishment = {
    id: string
    name: string
    index: number
    actions: Action[]
}

export type Rule = {
    id: string
    rule: string
    name: string
    content: string
    examples: string
    category: string
    punishments: Punishment[]
    createdAt: Date
    updatedAt: Date
}

interface ModalState {
    isOpen: boolean
    rule: Rule | null
    openModal: (rule: Rule) => void
    closeModal: () => void
}

export const useModalStore = create<ModalState>((set) => ({
    isOpen: false,
    rule: null,
    openModal: (rule: Rule) => set({ isOpen: true, rule }),
    closeModal: () => set({ isOpen: false, rule: null }),
}))