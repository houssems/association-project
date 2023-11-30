import { ArrayMinSize, IsArray, IsISO8601, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @MinLength(6)
  title: string;

  @IsNotEmpty()
  @IsISO8601({
    strict: true
  })
  startDate: string;

  @IsNotEmpty()
  @IsISO8601({
    strict: true
  })
  endDate: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  guestSpeakers: string[];
}
