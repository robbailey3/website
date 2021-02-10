import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  /**
   * The email of the user trying to log in.
   */
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public email: string;

  /**
   * The password of the user trying to log in.
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @ApiProperty()
  public password: string;
}
