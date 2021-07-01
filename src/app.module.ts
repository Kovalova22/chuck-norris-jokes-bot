import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JokesService } from './jokesAPI/jokesAPI.service';
import { BotService } from './telegram/bot.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, BotService, JokesService],
})
export class AppModule {}
