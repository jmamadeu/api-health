// Update with your config settings.
import path from 'path';

module.exports = {
  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: path.resolve(
        __dirname,
        'src',
        'database',
        'data',
        'db_health.sqlite'
      ),
    },
    migrations: {
      extension: 'ts',
      directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
    },
  },
  test: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: path.resolve(
        __dirname,
        'src',
        'database',
        'data',
        'db_health_test.sqlite'
      ),
    },
    migrations: {
      extension: 'ts',
      directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
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
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};
