import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty } from 'class-validator';

export class BaseEntityDto {
  @IsEmpty()
  @ApiProperty({ name: 'dateModified', type: Date })
  public dateModified: Date;
}
