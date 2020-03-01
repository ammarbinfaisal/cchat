module.exports = {
  development: {
    client: 'sqlite',
    connection: {
      filename: "./db.sqlite"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./migrations"
    }
  },

  production: {
    client: 'pg',
    connection: "postgres://postgres:password@0.0.0.0:5432/securise",
    migrations: {
      directory: "./migrations"
    }
  }
};
