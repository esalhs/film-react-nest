import { Injectable } from '@nestjs/common';
import { GetFilmDto, GetScheduleDto } from './dto/films.dto';
import { ListResponseDto } from '../common/list-response.dto';
import { FilmRepository } from '../repository/films.repository';

@Injectable()
export class FilmsService {
  constructor(private readonly repository: FilmRepository) {}

  async getFilms(): Promise<ListResponseDto<GetFilmDto>> {
    return this.repository.findAll();
  }

  async getSchedule(id: string): Promise<ListResponseDto<GetScheduleDto>> {
    return this.repository.findScheduleByFilmId(id);
  }
}
