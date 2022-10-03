import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

import configuration from '../common/configuration';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', '..', 'public'),
      serveStaticOptions: {
        index: false,
        cacheControl: true,
        maxAge: 365 * 24 * 60 * 60 * 1000,
      },
    }),
    // MailerModule.forRoot({
    //   transport: {
    //     host: process.env.MAIL_SEND_HOST,
    //     port: Number(process.env.MAIL_SEND_PORT),
    //     secure: process.env.MAIL_SEND_TLS == 'true',
    //     auth: {
    //       user: process.env.MAIL_SEND_USER,
    //       pass: process.env.MAIL_SEND_PASSWORD,
    //     },
    //   },
    //   defaults: {
    //     from: `"${process.env.MAIL_SEND_NAME}" <${process.env.MAIL_SEND_USER}>`,
    //   },
    //   template: {
    //     dir: path.join(__dirname, '..', '..', 'mailTemplates'),
    //     adapter: new HandlebarsAdapter(),
    //     options: {
    //       strict: true,
    //     },
    //   },
    // }),
    // ConfigModule.forRoot({ isGlobal: true }),
    // ScheduleModule.forRoot(),
    DatabaseModule,
    // UploadModule,
    // CronTasksModule,
    // FirebaseModule,
    // CoinbaseModule,
  ],
})
export class CoreModule {}
