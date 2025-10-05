import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET all rules
export async function GET() {
    try {
        const session = await auth()

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const rules = await prisma.rule.findMany({
            include: {
                punishments: {
                    include: {
                        actions: true
                    },
                    orderBy: {
                        index: 'asc'
                    }
                }
            },
            orderBy: [
                { rule: 'asc' }
            ]
        })

        return NextResponse.json(rules)
    } catch (error) {
        console.error('Error fetching rules:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

// CREATE new rule
export async function POST(request: Request) {
    try {
        const session = await auth()

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const currentUser = session.user as any

        if (currentUser.role !== 'ADMIN' && currentUser.role !== 'SUPERADMIN') {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }

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

        // Check if rule number already exists
        const existingRule = await prisma.rule.findUnique({
            where: { rule: rule.trim() }
        })

        if (existingRule) {
            return NextResponse.json({ error: 'Rule number already exists' }, { status: 400 })
        }

        // Create rule with punishments and actions
        const newRule = await prisma.rule.create({
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

        // Audit log
        await prisma.ruleAuditLog.create({
            data: {
                action: 'CREATE',
                ruleId: newRule.id,
                ruleData: JSON.stringify(newRule),
                userId: currentUser.id
            }
        })

        return NextResponse.json(newRule)
    } catch (error) {
        console.error('Error creating rule:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}