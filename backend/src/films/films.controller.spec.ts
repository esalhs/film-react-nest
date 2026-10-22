import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

const films = { total: 0, items: [] };

const schedule = {
  total: 1,
  items: [
    {
      id: 'session-1',
      daytime: '2024-06-28T10:00:53+03:00',
      hall: '0',
      rows: 5,
      seats: 10,
      price: 350,
      taken: [],
    },
  ],
};

describe('FilmsController', () => {
  let controller: FilmsController;

  const fakeService = {
    getFilms: jest.fn().mockResolvedValue(films),
    getSchedule: jest.fn().mockResolvedValue(schedule),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [{ provide: FilmsService, useValue: fakeService }],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return films', async () => {
    const result = await controller.findAllFilms();

    expect(fakeService.getFilms).toHaveBeenCalled();
    expect(result).toEqual(films);
  });

  it('should return schedule by id', async () => {
    const result = await controller.findSchedule('film-1');

    expect(fakeService.getSchedule).toHaveBeenCalledWith('film-1');
    expect(result).toEqual(schedule);
  });
});
