import mongoose, { Schema } from 'mongoose';

export interface ISchedule {
  id: string;
  daytime: string;
  hall: number;
  rows: number;
  seats: number;
  price: number;
  taken: string[];
}

export interface IFilm {
  id: string;
  rating: number;
  director: string;
  tags: string[];
  image: string;
  cover: string;
  title: string;
  about: string;
  description: string;
  schedule: ISchedule[];
}

const ScheduleSchema = new Schema<ISchedule>(
  {
    id: { type: String, required: true },
    daytime: String,
    hall: Number,
    rows: Number,
    seats: Number,
    price: Number,
    taken: [String],
  },
  { _id: false },
);

const FilmSchema = new Schema<IFilm>({
  id: { type: String, required: true },
  rating: { type: Number, required: true },
  director: { type: String, required: true },
  tags: { type: [String], required: true },
  image: { type: String, required: true },
  cover: { type: String, required: true },
  title: { type: String, required: true },
  about: { type: String, required: true },
  description: { type: String, required: true },
  schedule: { type: [ScheduleSchema], required: true },
});

export const Film = mongoose.model<IFilm>('Film', FilmSchema);
