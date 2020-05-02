import knex from 'knex';
import configDatabase from '../../knexfile';

const config =
  process.env.NODE_ENV === 'test'
    ? configDatabase.test
    : configDatabase.development;

const dbConnection = knex(config);

export default dbConnection;
