import { ArrayMinSize, IsArray, IsNotEmpty, IsOptional, IsString, MinLength, Validate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { FileEntity } from '../../files/entities/file.entity';
import { IsExist } from '../../utils/validators/is-exists.validator';
import { User } from '../../users/entities/user.entity';

export class CreateTopicDto {
  @IsNotEmpty()
  @MinLength(6)
  title: string;

  @IsNotEmpty()
  @MinLength(6)
  subtitle: string;

  @ApiProperty({ type: () => FileEntity })
  @IsOptional()
  @Validate(IsExist, ['FileEntity', 'id'], {
    message: 'imageNotExists'
  })
  photo?: FileEntity | null;

  @IsNotEmpty()
  @MinLength(6)
  content: string;

  @ApiProperty({ type: () => User })
  @Validate(IsExist, ['User', 'id'], {
    message: 'userNotExists'
  })
  contact: User;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  sections: string[];
}
