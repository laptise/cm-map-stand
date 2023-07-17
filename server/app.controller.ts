import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { SearchParams } from './input/search-params.input.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Query() params?: SearchParams) {
    return this.appService.getHello(params);
  }
}
