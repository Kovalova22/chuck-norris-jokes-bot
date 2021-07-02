import { Injectable, OnModuleInit } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import { JokesDBService } from 'src/database/jokesDB.service';
import { JokesService } from 'src/jokesAPI/jokesAPI.service';

const token = process.env.TELEGRAM_API_TOKEN;

const bot = new TelegramBot(token, { polling: true });

@Injectable()
export class BotService implements OnModuleInit {
  constructor(
    private readonly jokesService: JokesService,
    private readonly jokesDBService: JokesDBService,
  ) {}
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
        await this.jokesDBService.saveJoke(message.chat.id, joke);
        bot.sendMessage(
          message.chat.id,
          `Here is your random joke:\n"${joke}"`,
        );
      }

      if (callbackQuery.data === 'categories') {
        const categoriesArray = await this.jokesService.getCategories();
        const options = {
          reply_markup: {
            inline_keyboard: categoriesArray.map((item: string) => [
              {
                text: item,
                callback_data: item,
              },
            ]),
          },
        };
        bot.sendMessage(
          message.chat.id,
          `Please, choose the joke category: \n`,
          options,
        );

        bot.on('callback_query', async (callbackQuery) => {
          const message = callbackQuery.message;

          const joke = await this.jokesService.getOneCategory(
            callbackQuery.data,
          );
          await this.jokesDBService.saveJoke(message.chat.id, joke);
          bot.sendMessage(
            message.chat.id,
            `Here is your random joke for the category "${callbackQuery.data}":\n"${joke}"`,
          );
        });
      }

      if (callbackQuery.data === 'history') {
        const lastJokes = await this.jokesDBService.getUserJokes(
          message.chat.id,
        );

        bot.sendMessage(
          message.chat.id,
          `Your Last 10 Jokes are: ${lastJokes}`,
        );
      }
    });
  }
}
