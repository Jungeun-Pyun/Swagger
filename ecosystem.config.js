module.exports = {
    apps: [
        {
            name: "node_server",
            script : "./bin/www",
            watch : true,
            env: {
                "NODE_ENV":"local"
            },
            exec_mode: 'cluster',
            env_production : {
                "NODE_ENV":"production"
            }
        }
    ]
}