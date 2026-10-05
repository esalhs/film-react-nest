import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Film } from './film.entity';

@Entity('schedules')
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  daytime: string;

  @Column('integer')
  hall: number;

  @Column('double precision')
  price: number;

  @Column('integer')
  rows: number;

  @Column('integer')
  seats: number;

  @Column('simple-array')
  taken: string[];

  @ManyToOne(() => Film, (film) => film.schedule)
  film: Film;
}
