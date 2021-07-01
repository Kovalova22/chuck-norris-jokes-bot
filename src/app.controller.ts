import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { BotService } from './telegram/bot.service';

@Controller()
export class AppController {
  constructor(private readonly botService: BotService) {}

  @Get()
  getHello(@Res() res) {
    this.botService.botMessage();
    res.status(HttpStatus.OK).send('Bot service started');
  }
}
