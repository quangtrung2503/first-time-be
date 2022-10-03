export default () => ({
  port: parseInt(process.env.PORT, 10) || 5000,
  whitelistOrigins: (process.env.WHITELIST_ORIGINS || '')
    .split(',')
    .map((item) => (item && item.trim()) || item),
  database: {
    uri: process.env.MONGODB_URI,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});
