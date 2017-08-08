module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: `${__dirname}/../../src/appdata/dev.sqlite3`,
    },
    debug: false,
    useNullAsDefault: false,
    migrations: {
      directory: `${__dirname}/../../src/migrations`,
      tableName: 'knex_migrations',
    },
  },

  staging: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL || {
      host: '127.0.0.1',
      user: 'your_database_user',
      password: 'your_database_password',
      database: 'myapp_test',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: process.env.DATABASE_MINIMUM_POOL || 2,
      max: process.env.DATABASE_MAX_POOL || 10,
    },
    migrations: {
      tableName: process.env.DATABASE_MIGRATION_TABLE_NAME || 'knex_migrations',
    },
  },
};
