
module.exports = {
  apps: [{
    name: 'Ml-api-adapter',
    script: 'npm start',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    instances: 4,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development',
      KAFKA_BROKER_LIST: process.env.KAFKA_BROKER_LIST
    },
    env_production: {
      NODE_ENV: 'production',
    }
  }],
};
