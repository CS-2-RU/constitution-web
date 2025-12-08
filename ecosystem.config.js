module.exports = {
    apps: [{
        name: 'cs2ru.online',
        script: 'pnpm',
        args: 'run start',
        env: {
            PORT: 3001,
            NODE_ENV: 'production'
        },
    }]
}