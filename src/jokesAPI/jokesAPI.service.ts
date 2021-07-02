import { Injectable } from '@nestjs/common';
import axios from 'axios';

const URL = 'https://api.chucknorris.io/jokes/';

@Injectable()
export class JokesService {
  async getRandomJoke() {
    try {
      const randomJoke = await axios.get(`${URL}random`);
      return randomJoke.data.value;
    } catch (error) {
      throw error.response.message;
    }
  }

  async getCategories() {
    try {
      const categories = await axios.get(`${URL}categories`);
      return categories.data;
    } catch (error) {
      throw error.response.message;
    }
  }

  async getOneCategory(categoryName: string) {
    try {
      const category = await axios.get(`${URL}random?category=${categoryName}`);
      return category.data.value;
    } catch (error) {
      throw error.response.message;
    }
  }
}
