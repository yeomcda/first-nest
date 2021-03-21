import { IsNumber, IsString } from 'class-validator';

export class UpdateMovieDto {
  @IsString()
  readonly title?: string; // ? 기호 => not require

  @IsNumber()
  readonly year?: number;

  @IsString({ each: true })
  readonly genres?: string[];
}
