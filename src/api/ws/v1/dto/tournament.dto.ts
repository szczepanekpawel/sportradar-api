import { MaxLength, MinLength } from 'class-validator';

export class TournamentDto {
  @MinLength(8)
  @MaxLength(30)
  name: string;
}
