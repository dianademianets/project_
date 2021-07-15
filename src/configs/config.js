module.exports = {
    MONGO_URL: process.env.MONGO_URL || '',
    JWT_SECRET: process.env.JWT_SECRET || '',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || '',
    PORT: 5000,

    ROOT_EMAIL: process.env.ROOT_EMAIL || '',
    ROOT_EMAIL_PASSWORD: process.env.ROOT_EMAIL_PASSWORD || '',

    DB: process.env.DB || 'task',
    DB_USER: process.env.DB_USER || 'root',
    DB_PASSWORD: process.env.DB_PASSWORD || 'root',

    SENTRY_DSN: process.env.SENTRY_DSN || '',

    JWT_ACTIVATE_SECRET: process.env.JWT_REFRESH_SECRET || ''

};
