import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';

const URL = 'https://api.chucknorris.io/jokes/';

@Injectable()
export class JokesService {
  async getRandomJoke() {
    const randomJoke = await axios.get(`${URL}random`);
    if (!randomJoke) {
      throw new NotFoundException();
    }
    return randomJoke.data.value;
  }

  async getCategories() {
    const categories = await axios.get(`${URL}categories`);
    if (!categories) {
      throw new NotFoundException();
    }
    return categories.data;
  }
}
