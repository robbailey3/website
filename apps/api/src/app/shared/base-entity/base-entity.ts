import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty } from 'class-validator';

export class BaseEntity {
  @ApiProperty()
  @IsEmpty()
  public dateAdded: Date;

  @ApiProperty()
  @IsEmpty()
  public dateModified: Date;
}
