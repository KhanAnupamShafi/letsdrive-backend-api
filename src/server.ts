/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { Server } from 'http';
import app from './app';
import config from './config/index';

async function bootstrap() {
  try {
    const server: Server = app.listen(config.port, () => {
      console.log(`Backend Server listening on port ${config.port}`);
    });
  } catch (err) {
    console.error('Failed to connect database', err);
  }
}

bootstrap();
