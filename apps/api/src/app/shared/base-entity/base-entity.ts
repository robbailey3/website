import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmpty } from 'class-validator';
import { ObjectID } from 'mongodb';

export class BaseEntity {
  @ApiProperty()
  @IsEmpty()
  @Type(() => String)
  public _id: ObjectID;

  @ApiProperty()
  @IsEmpty()
  public dateAdded: Date;

  @ApiProperty()
  @IsEmpty()
  public dateModified: Date;
}
