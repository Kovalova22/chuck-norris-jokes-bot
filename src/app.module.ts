import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JokesService } from './jokesAPI/jokesAPI.service';
import { BotService } from './telegram/bot.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      database: process.env.DATABASE_NAME,
      useUnifiedTopology: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, BotService, JokesService],
})
export class AppModule {}
