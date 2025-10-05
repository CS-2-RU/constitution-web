import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET single rule
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth()

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { id } = await params

        const rule = await prisma.rule.findUnique({
            where: { id },
            include: {
                punishments: {
                    include: {
                        actions: true
                    },
                    orderBy: {
                        index: 'asc'
                    }
                }
            }
        })

        if (!rule) {
            return NextResponse.json({ error: 'Rule not found' }, { status: 404 })
        }

        return NextResponse.json(rule)
    } catch (error) {
        console.error('Error fetching rule:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

// UPDATE rule
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth()

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const currentUser = session.user as any

        if (currentUser.role !== 'SUPERADMIN') {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }

        const { id } = await params
        const { rule, name, content, examples, categoryId, punishments } = await request.json()

        // Validate required fields
        if (!rule?.trim() || !name?.trim() || !content?.trim() || !examples?.trim() || !categoryId) {
            return NextResponse.json({ error: 'All fields are required and cannot be empty' }, { status: 400 })
        }

        // Verify category exists
        const category = await prisma.category.findUnique({
            where: { id: categoryId }
        })

        if (!category) {
            return NextResponse.json({ error: 'Category not found' }, { status: 400 })
        }

        // Check if rule exists
        const existingRule = await prisma.rule.findUnique({
            where: { id },
            include: {
                category: true,
                punishments: {
                    include: {
                        actions: true
                    }
                }
            }
        })

        if (!existingRule) {
            return NextResponse.json({ error: 'Rule not found' }, { status: 404 })
        }

        // Check if rule number conflicts with another rule
        const conflictingRule = await prisma.rule.findUnique({
            where: { rule: rule.trim() }
        })

        if (conflictingRule && conflictingRule.id !== id) {
            return NextResponse.json({ error: 'Rule number already exists' }, { status: 400 })
        }

        // Update rule
        const updatedRule = await prisma.$transaction(async (tx) => {
            // Delete existing punishments (actions will be deleted via cascade)
            await tx.punishment.deleteMany({
                where: { ruleId: id }
            })

            // Update rule with new punishments and actions
            const updated = await tx.rule.update({
                where: { id },
                data: {
                    rule: rule.trim(),
                    name: name.trim(),
                    content: content.trim(),
                    examples: examples.trim(),
                    categoryId: categoryId,
                    punishments: {
                        create: punishments?.map((p: any, index: number) => ({
                            name: p.name?.trim(),
                            index: p.index ?? index,
                            actions: {
                                create: p.actions?.map((a: any) => ({
                                    type: a.type,
                                    duration: a.duration?.trim() || null
                                })) || []
                            }
                        })) || []
                    }
                },
                include: {
                    category: true,
                    punishments: {
                        include: {
                            actions: true
                        },
                        orderBy: {
                            index: 'asc'
                        }
                    }
                }
            })

            return updated
        })

        // Audit log
        await prisma.ruleAuditLog.create({
            data: {
                action: 'EDIT',
                ruleId: updatedRule.id,
                ruleData: JSON.stringify(updatedRule),
                userId: currentUser.id
            }
        })

        return NextResponse.json(updatedRule)
    } catch (error) {
        console.error('Error updating rule:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

// DELETE rule
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth()

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const currentUser = session.user as any

        if (currentUser.role !== 'SUPERADMIN') {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }

        const { id } = await params

        // Get rule before deletion for audit log
        const existingRule = await prisma.rule.findUnique({
            where: { id },
            include: {
                punishments: {
                    include: {
                        actions: true
                    }
                }
            }
        })

        if (!existingRule) {
            return NextResponse.json({ error: 'Rule not found' }, { status: 404 })
        }

        // Delete rule (punishments will be deleted via cascade)
        await prisma.rule.delete({
            where: { id }
        })

        // Audit log
        await prisma.ruleAuditLog.create({
            data: {
                action: 'DELETE',
                ruleId: null, // Rule no longer exists
                ruleData: JSON.stringify(existingRule),
                userId: currentUser.id
            }
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error deleting rule:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}