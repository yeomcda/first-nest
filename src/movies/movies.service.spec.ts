import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a movie', () => {
      const result = service.create({
        title: 'test',
        genres: ['test'],
        year: 2021,
      });

      expect(typeof result).toEqual('number');
    });
  });

  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('suould return a movie', () => {
      const id = service.create({
        title: 'test',
        genres: ['test'],
        year: 2021,
      });
      const result = service.getOne(id);
      expect(result).toBeDefined;
    });

    it('should throw a NotFoundException', () => {
      try {
        service.getOne(0);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      const id = service.create({
        title: 'test',
        genres: ['test'],
        year: 2021,
      });

      service.update(id, {
        year: 2022,
      });
      const afterMovie = service.getOne(id);
      expect(afterMovie.year).toEqual(2022);
    });

    it('should throw a NotFoundException', () => {
      try {
        service.update(0, {});
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('delete', () => {
    it('should delete a movie', () => {
      const id = service.create({
        title: 'test',
        genres: ['test'],
        year: 2021,
      });

      const result = service.delete(id);
      expect(result).toEqual(true);
    });

    it('should throw a NotFoundException', () => {
      try {
        service.delete(0);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
