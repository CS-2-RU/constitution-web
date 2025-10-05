module.exports = {
    apps: [{
        name: 'constitution.cs2ru.online',
        script: 'npm',
        args: 'run start',
        instances: 1,
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
        env: {
            PORT: 3015,
            NODE_OPTIONS: '--max-old-space-size=2048'
        },
    }]
}