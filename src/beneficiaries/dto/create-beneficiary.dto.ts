import { ArrayMinSize, IsArray, IsEnum, IsNotEmpty, IsString, MinLength, Validate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { FileEntity } from '../../files/entities/file.entity';
import { IsExist } from '../../utils/validators/is-exists.validator';
import { BeneficiaryStatusEnum } from '../beneficiary-status.enum';

export class CreateBeneficiaryDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @MinLength(6)
  name: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @MinLength(6)
  address: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @MinLength(6)
  country: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @MinLength(6)
  telephone: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @MinLength(6)
  email: string;

  @ApiProperty({ type: () => FileEntity })
  @Validate(IsExist, ['FileEntity', 'id'], {
    message: 'imageNotExists'
  })
  photo?: FileEntity | null;

  @ApiProperty({ type: String, required: false })
  @IsArray()
  @IsString({ each: true })
  summary: string[];

  @ApiProperty({ type: String })
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  sections: string[];

  @ApiProperty()
  @IsEnum(BeneficiaryStatusEnum)
  status: BeneficiaryStatusEnum;
}
