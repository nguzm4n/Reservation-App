import express, { Request, Response } from 'express';
import { env } from 'process';
import { PostgresConnectDB } from './config/postgres.config';

const app = express();

const startServer = async () => {
  try {
    await PostgresConnectDB(); // Esperar la conexión

    const PORT: number = Number(env.PORT) || 1234;

    app.get('/', (req: Request, res: Response) => {
      res.status(200).send('<h1>Hello World</h1>');
    });

    app.listen(PORT, () => {
      console.log(`Server listening on port http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
  }
};

startServer();
