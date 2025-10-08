import {visit} from "unist-util-visit";

export function customDirectives() {
    return (tree: any) => {
        visit(tree, (node) => {
            if (
                node.type === 'textDirective' ||
                node.type === 'leafDirective' ||
                node.type === 'containerDirective'
            ) {
                const data = node.data || (node.data = {})

                const directiveConfig: Record<string, {emoji?: string, className: string, inline?: boolean}> = {
                    danger: {emoji: '⛔', className: 'directive-danger'},
                    warn: {emoji: '⚠️', className: 'directive-warn'},
                    accept: {emoji: '✅', className: 'directive-accept'},
                    user: {className: 'directive-user', inline: true},
                    channel: {className: 'directive-channel', inline: true},
                    red: {className: 'directive-red', inline: true},
                    red_background: {className: 'directive-red-bg', inline: true},
                    message: {className: 'directive-message'}
                }

                if (directiveConfig[node.name]) {
                    const config = directiveConfig[node.name]

                    if (config.inline) {
                        // Inline code-like styling
                        data.hName = 'span'
                        data.hProperties = {
                            className: `custom-directive-inline ${config.className}`
                        }
                    } else if (node.name === 'message') {
                        // Message directive with pfp and name
                        const pfp = node.attributes?.pfp || '?'
                        const name = node.attributes?.name || 'Anonymous'

                        data.hName = 'div'
                        data.hProperties = {
                            className: `custom-directive ${config.className}`
                        }
                        node.children = [
                            {
                                type: 'paragraph',
                                data: {
                                    hName: 'div',
                                    hProperties: { className: 'message-pfp' }
                                },
                                children: [
                                    { type: 'text', value: pfp.charAt(0).toUpperCase() }
                                ]
                            },
                            {
                                type: 'paragraph',
                                data: {
                                    hName: 'div',
                                    hProperties: { className: 'message-content' }
                                },
                                children: [
                                    {
                                        type: 'paragraph',
                                        data: {
                                            hName: 'div',
                                            hProperties: { className: 'message-name' }
                                        },
                                        children: [
                                            { type: 'text', value: name }
                                        ]
                                    },
                                    {
                                        type: 'paragraph',
                                        data: {
                                            hName: 'div',
                                            hProperties: { className: 'message-text' }
                                        },
                                        children: node.children || []
                                    }
                                ]
                            }
                        ]
                    } else {
                        // Block-level styling
                        data.hName = 'div'
                        data.hProperties = {
                            className: `custom-directive ${config.className}`
                        }
                        node.children = [
                            {
                                type: 'paragraph',
                                children: [
                                    {type: 'text', value: `${config.emoji} `},
                                    ...(node.children || [])
                                ]
                            }
                        ]
                    }
                }
            }
        })
    }
}