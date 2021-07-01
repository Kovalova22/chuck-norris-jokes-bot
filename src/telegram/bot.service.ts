import { Injectable, OnModuleInit } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';

@Injectable()
export class BotService implements OnModuleInit {
  onModuleInit() {
    this.botMessage();
  }

  botMessage() {
    const token = process.env.TELEGRAM_API_TOKEN;

    const bot = new TelegramBot(token, { polling: true });

    bot.on('message', (msg) => {
      const Hi = 'hi';
      if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
        bot.sendMessage(
          msg.from.id,
          'Hello ' +
            msg.from.first_name +
            ' what would you like to know about me ?',
        );
      }
    });
  }
}
