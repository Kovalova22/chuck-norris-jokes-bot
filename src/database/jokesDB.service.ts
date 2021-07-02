import { Injectable } from '@nestjs/common';
import { getMongoManager } from 'typeorm';
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
}
