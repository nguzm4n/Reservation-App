import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

const isProduction = process.env.PRODUCTION === 'true';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const TypeORM = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB_NAME,
  synchronize: false,
  logging: !isProduction,
  entities: [__dirname + "/../models/postgres/*.model.ts"],
  migrations: [__dirname + '/../../migrations/*.ts'],
  subscribers: [],
  ssl: isProduction
    ? {
      requestCert: true,
      rejectUnauthorized: true,
      ca: process.env.POSTGRES_CA_CERT ?? undefined,
      key: process.env.POSTGRES_KEY_FILE ?? undefined,
    }
    : false,
});

TypeORM.initialize()
export const PostgresConnectDB = async () => {
  try {
    await TypeORM.initialize();
    console.log('Connected to PostgreSQL database via TypeORM!');

    const pendingMigrations = await TypeORM.showMigrations();
    if (pendingMigrations) {
      console.log('Pending migrations: ', pendingMigrations);
      await TypeORM.runMigrations();
      console.log('Migrations executed successfully.');
    }
  } catch (error) {
    console.error('Error during PostgreSQL Data Source initialization:', error);
    process.exit(1);
  }
};

export const PostgresCloseDB = async () => {
  try {
    await TypeORM.destroy();
    console.log('PostgreSQL connection closed');
  } catch (error) {
    console.error('Error closing PostgreSQL connection:', error);
  }
};


