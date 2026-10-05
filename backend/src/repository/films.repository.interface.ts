import { ListResponseDto } from '../common/list-response.dto';
import { GetFilmDto, GetScheduleDto } from '../films/dto/films.dto';
import { Schedule } from './schedule.entity';

export interface FilmsRepository {
  findAll(): Promise<ListResponseDto<GetFilmDto>>;
  findScheduleByFilmId(
    filmId: string,
  ): Promise<ListResponseDto<GetScheduleDto>>;
  findSession(filmId: string, sessionId: string): Promise<Schedule | null>;
  bookSeats(filmId: string, sessionId: string, seats: string[]): Promise<void>;
}
