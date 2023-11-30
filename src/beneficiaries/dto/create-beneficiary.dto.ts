import { ArrayMinSize, IsArray, IsNotEmpty, IsOptional, IsString, MinLength, Validate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { FileEntity } from '../../files/entities/file.entity';
import { IsExist } from '../../utils/validators/is-exists.validator';

export class CreateBeneficiaryDto {
  @IsNotEmpty()
  @MinLength(6)
  name: string;

  @IsNotEmpty()
  @MinLength(6)
  address: string;

  @IsNotEmpty()
  @MinLength(6)
  country: string;

  @IsNotEmpty()
  @MinLength(6)
  telephone: string;

  @IsNotEmpty()
  @MinLength(6)
  email: string;

  @ApiProperty({ type: () => FileEntity })
  @IsOptional()
  @Validate(IsExist, ['FileEntity', 'id'], {
    message: 'imageNotExists'
  })
  photo?: FileEntity | null;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  guestSpeakers: string[];
}
