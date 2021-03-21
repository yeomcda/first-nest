import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  // beforeEach -> beforeAll 로 변경. 테스트마다 동일한 AppModule 을 사용하기 위함.
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // 테스트용 appModule 에도 기능 추가.
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // decorator 없는 property 거름
        forbidNonWhitelisted: true, // 허용되지 않은 property 요청을 막음
        transform: true, // request parameter를 원하는 실제 타입으로 변환
      }),
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('welcome first nest api');
  });

  describe('/movies', () => {
    it('GET', () => {
      return request(app.getHttpServer()).get('/movies').expect(200).expect([]);
    });

    it('POST 201', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'test',
          genres: ['test'],
          year: 2021,
        })
        .expect(201);
    });

    it('POST 400', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'test'
        })
        .expect(400);
    });

    describe('/movies/:id', () => {
      it('GET 200', () => {
        return request(app.getHttpServer()).get('/movies/1').expect(200);
      });

      it('GET 404', () => {
        return request(app.getHttpServer()).get('/movies/0').expect(404);
      });

      it('PATCH 200', () => {
        return request(app.getHttpServer())
          .patch('/movies/1')
          .send({ year: 2022 })
          .expect(200);
      });

      it('PATCH 404', () => {
        return request(app.getHttpServer())
          .patch('/movies/0')
          .send({ year: 2022 })
          .expect(404);
      });

      it('DELETE 200', () => {
        return request(app.getHttpServer()).delete('/movies/1').expect(200);
      });
    });
  });
});
