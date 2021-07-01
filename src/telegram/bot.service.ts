import { Injectable, OnModuleInit } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';

const token = process.env.TELEGRAM_API_TOKEN;

const bot = new TelegramBot(token, { polling: true });

@Injectable()
export class BotService implements OnModuleInit {
  onModuleInit() {
    this.botGreeting();
  }

  botGreeting() {
    bot.onText(/\/start/, (msg) => {
      console.log(msg.from.id, msg);
      bot.sendMessage(
        msg.from.id,
        `Hello ${msg.from.first_name}!\nHere you can find Chuck Norris jokes! \nTo get a random joke please press random. \nIf you are interested in categories you can find list of them. \nAnd you are also free to see the last ten jokes you have laughed at!`,
        {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: 'Random Joke',
                  callback_data: 'random',
                },
                {
                  text: 'Categories',
                  callback_data: 'categories',
                },
                {
                  text: 'History',
                  callback_data: 'history',
                },
              ],
            ],
          },
        },
      );
    });
  }
}
