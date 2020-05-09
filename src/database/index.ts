import 'reflect-metadata';
import { createConnection, getConnectionOptions } from 'typeorm';

const configDatabase = getConnectionOptions('default');

export default async function connection() {
  return await createConnection()
    .then(() => console.log('database connected'))
    .catch(() => console.log('database error'));
}

// const config =
//   process.env.NODE_ENV === 'test'
//     ? configDatabase.test
//     : configDatabase.development;

// const dbConnection = knex(config);

// export default dbConnection;
