import { ListResponseDto } from '../common/list-response.dto';
import { CreateOrderDto, OrderResultDto } from './dto/order.dto';
import { FilmRepository } from '../repository/films.repository';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class OrderService {
  constructor(private readonly filmRepository: FilmRepository) {}

  async createOrder(
    order: CreateOrderDto,
  ): Promise<ListResponseDto<OrderResultDto>> {
    const checked = new Set<string>();

    for (const ticket of order.tickets) {
      const combination = `${ticket.session}:${ticket.row}:${ticket.seat}`;
      if (checked.has(combination)) {
        throw new BadRequestException({ error: 'Место указано дважды' });
      }

      const session = await this.filmRepository.findSession(
        ticket.film,
        ticket.session,
      );
      if (!session) {
        throw new BadRequestException({ error: 'Сеанс не найден' });
      }

      if (session.taken.includes(`${ticket.row}:${ticket.seat}`)) {
        throw new BadRequestException({ error: 'Место уже занято' });
      }

      checked.add(combination);
    }

    for (const ticket of order.tickets) {
      const place = [`${ticket.row}:${ticket.seat}`];
      await this.filmRepository.bookSeats(ticket.film, ticket.session, place);
    }

    const items = order.tickets.map((ticket) => ({
      ...ticket,
      id: crypto.randomUUID(),
    }));
    return { total: items.length, items };
  }
}
