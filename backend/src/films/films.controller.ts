import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmService: FilmsService) {}

  @Get()
  findAllFilms() {
    return this.filmService.getFilms();
  }

  @Get(':id/schedule')
  findSchedule(@Param('id') id: string) {
    return this.filmService.getSchedule(id);
  }
}
