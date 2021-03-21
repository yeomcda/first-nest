import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesServie: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.moviesServie.getAll();
  }

  @Get('/search')
  search(@Query('year') year: string) {
    return `search movie year: ${year}`;
  }

  @Get('/:id')
  getOne(@Param('id') id: number): Movie {
    return this.moviesServie.getOne(id);
  }

  @Post()
  create(@Body() data: CreateMovieDto): number {
    return this.moviesServie.create(data);
  }

  // patch: 일부만, put: 전체
  @Patch('/:id')
  update(@Param('id') id: number, @Body() data: UpdateMovieDto) {
    return this.moviesServie.update(id, data);
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    this.getOne(id);
    this.moviesServie.delete(id);
  }
}
