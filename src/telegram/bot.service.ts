import { Injectable, OnModuleInit } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import { JokesService } from 'src/jokesAPI/jokesAPI.service';

const token = process.env.TELEGRAM_API_TOKEN;

const bot = new TelegramBot(token, { polling: true });

@Injectable()
export class BotService implements OnModuleInit {
  constructor(private readonly jokesService: JokesService) {}
  onModuleInit() {
    this.botGreeting();
  }

  botGreeting() {
    bot.onText(/\/start/, (msg) => {
      bot.sendMessage(
        msg.from.id,
        `Hello ${msg.from.first_name}!\nHere you can find Chuck Norris jokes! \nTo get a random joke please press random. \nIf you are interested in categories you can find list of them. \nAnd you are also free to see the last ten jokes you have laughed at!`,
        {
          reply_markup: {
            one_time_keyboard: true,
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

    bot.on('callback_query', async (callbackQuery) => {
      const message = callbackQuery.message;

      if (callbackQuery.data === 'random') {
        const joke = await this.jokesService.getRandomJoke();
        bot.sendMessage(
          message.chat.id,
          `Here is your random joke:\n\n"${joke}"`,
        );
      }

      if (callbackQuery.data === 'categories') {
        const categoriesArray = await this.jokesService.getCategories();
        bot.sendMessage(
          message.chat.id,
          `Please, choose the joke category: \n`,
          {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: `${categoriesArray[0]}`,
                    callback_data: `${categoriesArray[0]}`,
                  },
                  {
                    text: `${categoriesArray[1]}`,
                    callback_data: `${categoriesArray[1]}`,
                  },
                  {
                    text: `${categoriesArray[2]}`,
                    callback_data: `${categoriesArray[2]}`,
                  },
                ],
              ],
            },
          },
        );
      }
    });
  }
}
