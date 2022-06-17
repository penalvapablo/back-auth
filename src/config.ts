export const config = {
  port: process.env.PORT || 3000,
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 27017,
    name: process.env.DB_NAME || 'chatAppAngular',
    dbURI:
      process.env.MONGO_DB ||
      'mongodb://root:password@localhost:27017/chatAppAngular?authSource=admin',
  },
  jwtConstants: {
    secret: process.env.JWT_SECRET || 'secretKey',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
};
