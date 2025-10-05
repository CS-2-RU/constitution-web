module.exports = {
    apps: [{
        name: 'cs2ru.online',
        script: 'pnpm',
        args: 'run start',
        cwd: '/root/constitution.cs2ru.online',
        env: {
            PORT: 3015,
            NODE_ENV: 'production'
        },
        instances: 1,
        exec_mode: 'fork',
        autorestart: true,
        watch: false,
        max_memory_restart: '500M'
    }]
}
