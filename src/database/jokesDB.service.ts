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
    const jokesArray = await jokesRepository.find({
      take: 10,
      where: {
        chatId: { $eq: chatId },
      },
    });
    const jokes = returnJokes(jokesArray);
    return jokes;
  }
}

function returnJokes(jokesArr: any) {
  const jokes = jokesArr.map((items) => items.joke);
  return jokes.join('\n\n');
}
