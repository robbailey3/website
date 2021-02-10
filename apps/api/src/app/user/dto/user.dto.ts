import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsString,
  MinLength
} from 'class-validator';

export class UserDto {
  @ApiProperty()
  @IsEmpty()
  @Type(() => String)
  public _id: any;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public lastName: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty()
  @Exclude({ toPlainOnly: true })
  public password: string;

  @ApiProperty()
  @IsEmpty()
  public lastLogIn: Date;
}
