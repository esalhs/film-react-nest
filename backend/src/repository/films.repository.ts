import { Injectable } from '@nestjs/common';
import { GetFilmDto, GetScheduleDto } from '../films/dto/films.dto';
import { ListResponseDto } from '../common/list-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from './film.entity';
import { Schedule } from './schedule.entity';
import { Repository } from 'typeorm';
import { FilmsRepository } from './films.repository.interface';

@Injectable()
export class FilmRepository implements FilmsRepository {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}

  private getFilmMapperFn(): (film: Film) => GetFilmDto {
    return (film) => ({
      id: film.id,
      rating: film.rating,
      director: film.director,
      tags: film.tags,
      image: film.image,
      cover: film.cover,
      title: film.title,
      about: film.about,
      description: film.description,
    });
  }

  private getScheduleMapperFn(): (schedule: Schedule) => GetScheduleDto {
    return (schedule) => ({
      id: schedule.id,
      daytime: schedule.daytime,
      hall: schedule.hall.toString(),
      rows: schedule.rows,
      seats: schedule.seats,
      price: schedule.price,
      taken: schedule.taken,
    });
  }

  async findAll(): Promise<ListResponseDto<GetFilmDto>> {
    const films = await this.filmRepository.find();
    const items = films.map(this.getFilmMapperFn());
    return { total: items.length, items };
  }

  async findScheduleByFilmId(
    filmId: string,
  ): Promise<ListResponseDto<GetScheduleDto>> {
    const film = await this.filmRepository.findOne({
      where: { id: filmId },
      relations: { schedule: true },
    });

    if (!film) {
      return { total: 0, items: [] };
    }

    const items = film.schedule.map(this.getScheduleMapperFn());
    return { total: items.length, items };
  }

  async findSession(
    filmId: string,
    sessionId: string,
  ): Promise<Schedule | null> {
    return this.scheduleRepository.findOne({
      where: { id: sessionId, film: { id: filmId } },
    });
  }

  async bookSeats(
    filmId: string,
    sessionId: string,
    seats: string[],
  ): Promise<void> {
    const session = await this.findSession(filmId, sessionId);

    if (!session) {
      return;
    }

    session.taken.push(...seats);
    await this.scheduleRepository.save(session);
  }
}
