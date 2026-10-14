import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

const order = {
  email: 'test@test.ru',
  phone: '+79000000000',
  tickets: [
    {
      film: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
      session: 'f2e429b0-685d-41f8-a8cd-1d8cb63b99ce',
      daytime: '2024-06-28T10:00:53+03:00',
      row: 1,
      seat: 1,
      price: 350,
    },
  ],
};

const orderResult = {
  total: 1,
  items: [
    {
      film: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
      session: 'f2e429b0-685d-41f8-a8cd-1d8cb63b99ce',
      daytime: '2024-06-28T10:00:53+03:00',
      row: 1,
      seat: 1,
      price: 350,
      id: 'ticket-1',
    },
  ],
};

describe('OrderController', () => {
  let controller: OrderController;

  const fakeService = {
    createOrder: jest.fn().mockResolvedValue(orderResult),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [{ provide: OrderService, useValue: fakeService }],
    }).compile();

    controller = module.get<OrderController>(OrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an order', async () => {
    const createdOrder = await controller.createOrder(order);

    expect(createdOrder).toEqual(orderResult);
    expect(fakeService.createOrder).toHaveBeenCalledWith(order);
  });
});
