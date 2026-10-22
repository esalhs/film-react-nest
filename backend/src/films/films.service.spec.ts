import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from './films.service';
import { FilmRepository } from '../repository/films.repository';

describe('FilmsService', () => {
  let service: FilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilmsService, { provide: FilmRepository, useValue: {} }],
    }).compile();

    service = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
