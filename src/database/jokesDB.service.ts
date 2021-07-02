import { Injectable } from '@nestjs/common';
import { getMongoManager, getMongoRepository } from 'typeorm';
import { Jokes } from './jokesDB.entity';

@Injectable()
export class JokesDBService {
  async saveJoke(chatId: number, joke: string): Promise<Jokes> {
    const jokes = new Jokes();
    jokes.chatId = chatId;
    jokes.joke = joke;

    const manager = getMongoManager();
    return await manager.save(jokes);
  }

  async getUserJokes(chatId: number) {
    const jokesRepository = getMongoRepository(Jokes);
    const jokes = await jokesRepository.find({
      take: 10,
      where: {
        chatId: { $eq: chatId },
      },
    });
    console.log(jokes);
    return jokes.map((items) => items.joke);
  }
}
