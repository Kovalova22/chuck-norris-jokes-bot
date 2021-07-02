import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JokesDBModule } from './database/jokesDB.module';
import { JokesDBService } from './database/jokesDB.service';
import { JokesService } from './jokesAPI/jokesAPI.service';
import { BotController } from './telegram/bot.controller';
import { BotService } from './telegram/bot.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      database: process.env.DATABASE_NAME,
      useUnifiedTopology: true,
      autoLoadEntities: true,
      synchronize: true,
    }),
    JokesDBModule,
  ],
  controllers: [BotController],
  providers: [BotService, JokesService, JokesDBService],
})
export class AppModule {}
