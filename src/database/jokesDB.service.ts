import { Injectable, NotFoundException } from '@nestjs/common';
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

  async getUserJokes(chatId: number): Promise<Jokes[]> {
    const jokesRepository = getMongoRepository(Jokes);
    const jokesArray = await jokesRepository.find({
      take: 10,
      where: {
        chatId: { $eq: chatId },
      },
    });
    if (jokesArray.length === 0) {
      throw new NotFoundException('You have not any jokes in history yet!');
    }
    const jokes = refactorArray(jokesArray);
    return jokes;
  }
}

function refactorArray(jokesArr: any) {
  const jokes = jokesArr.map((items) => items.joke);
  return jokes.join('\n\n');
}
