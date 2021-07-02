import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';

const URL = 'https://api.chucknorris.io/jokes/';

@Injectable()
export class JokesService {
  async getRandomJoke() {
    const randomJoke = await axios.get(`${URL}random`);
    if (!randomJoke?.data) {
      throw new NotFoundException();
    }
    return randomJoke.data.value;
  }

  async getCategories() {
    const categories = await axios.get(`${URL}categories`);
    if (!categories?.data) {
      throw new NotFoundException();
    }
    return categories.data;
  }

  async getOneCategory(categoryName: string) {
    const category = await axios.get(`${URL}random?category=${categoryName}`);
    if (!category?.data) {
      throw new NotFoundException();
    }
    return category.data.value;
  }
}
