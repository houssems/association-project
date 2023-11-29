import { Equals, IsBoolean, IsNotEmpty } from 'class-validator';

export class AssignAttendeeDto {
  @IsNotEmpty()
  trainingId: number;

  @IsNotEmpty()
  @IsBoolean()
  @Equals(true)
  confirm: boolean;
}
