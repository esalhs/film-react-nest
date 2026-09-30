import { Inject, Injectable } from '@nestjs/common';
import { Film, IFilm, ISchedule } from './film.schema';
import { GetFilmDto, GetScheduleDto } from '../films/dto/films.dto';
import { ListResponseDto } from '../common/list-response.dto';
import { Mongoose } from 'mongoose';

@Injectable()
export class FilmRepository {
  constructor(@Inject('CONNECTION') private readonly connection: Mongoose) {}

  private getFilmMapperFn(): (film: IFilm) => GetFilmDto {
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

  private getScheduleMapperFn(): (schedule: ISchedule) => GetScheduleDto {
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
    const films = await Film.find();
    const items = films.map(this.getFilmMapperFn());
    return { total: items.length, items };
  }

  async findScheduleByFilmId(
    filmId: string,
  ): Promise<ListResponseDto<GetScheduleDto>> {
    const film = await Film.findOne({ id: filmId });

    if (!film) {
      return { total: 0, items: [] };
    }

    const items = film.schedule.map(this.getScheduleMapperFn());
    return { total: items.length, items };
  }

  async findSession(
    filmId: string,
    sessionId: string,
  ): Promise<ISchedule | null> {
    const film = await Film.findOne({ id: filmId });

    if (!film) {
      return null;
    }

    const session = film.schedule.find((session) => session.id === sessionId);
    return session ?? null;
  }

  async bookSeats(
    filmId: string,
    sessionId: string,
    seats: string[],
  ): Promise<void> {
    const film = await Film.findOne({ id: filmId });
    if (!film) {
      return;
    }

    const session = film.schedule.find((session) => session.id === sessionId);
    if (!session) {
      return;
    }

    session.taken.push(...seats);
    await film.save();
  }
}
