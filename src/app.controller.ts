import { Controller, Get } from '@nestjs/common';
import { BotService } from './telegram/bot.service';

@Controller()
export class AppController {
  constructor(private readonly botService: BotService) {}

  @Get()
  botGreeting() {
    this.botService.botGreeting();
  }
}
