import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { FilmRepository } from '../repository/films.repository';

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderService, { provide: FilmRepository, useValue: {} }],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
