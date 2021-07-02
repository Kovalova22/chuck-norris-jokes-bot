module.exports = {
  type: 'mongodb',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  database: process.env.DATABASE_NAME,
  synchronize: true,
  entities: [`${__dirname}/src/**/*.entity.ts`],
  cli: {
    entitiesDir: 'src',
  },
};
