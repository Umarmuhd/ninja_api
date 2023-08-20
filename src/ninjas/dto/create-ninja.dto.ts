import { IsEnum, MinLength, Min } from 'class-validator';

export class CreateNinjaDto {
  @MinLength(3)
  name: string;
  @IsEnum(['black-belt', 'orange-belt'], {
    message: 'rank must be either black-belt or orange-belt',
  })
  rank: string;
  @Min(18)
  age: number;
}
