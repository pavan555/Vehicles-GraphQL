module.exports = {
  development: {
    username: "root",
    password: null,
    database: "reviews_db_dev",
    dialect: "sqlite",
    storage: "src/datasources/reviews.db",
  },
  production: {
    password: null,
    username: null,
    database: null,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
    logging: true,
    use_env_variable: "DATABASE_URL",
  },
};
