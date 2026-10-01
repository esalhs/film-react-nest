import { ConfigModule } from '@nestjs/config';
import mongoose from 'mongoose';

export const configProvider = {
  imports: [ConfigModule.forRoot()],
  provide: 'CONFIG',
  useValue: <AppConfig>{
    database: {
      driver: process.env.DATABASE_DRIVER,
      url: process.env.DATABASE_URL,
    },
  },
};

export interface AppConfig {
  database: AppConfigDatabase;
}

export interface AppConfigDatabase {
  driver: string;
  url: string;
}

export const connectionProvider = {
  provide: 'CONNECTION',
  inject: ['CONFIG'],
  useFactory: async (config: AppConfig) => {
    return mongoose.connect(config.database.url);
  },
};
