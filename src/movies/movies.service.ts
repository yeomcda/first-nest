import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: number): Movie {
    const movie = this.movies.find((movie) => movie.id === id);
    if (!movie) {
      throw new NotFoundException(`not found movie with id ${id}`);
    }

    return movie;
  }

  create(movieData: CreateMovieDto): number {
    const id = this.movies.length + 1;
    this.movies.push({
      id,
      ...movieData,
    });

    return id;
  }

  update(id: number, updateData: UpdateMovieDto) {
    const movie = this.getOne(id);
    this.delete(id);
    this.movies.push({
      ...movie,
      ...updateData,
    });
  }

  delete(id: number): boolean {
    this.movies = this.movies.filter((movie) => movie.id !== id);

    return true;
  }
}
