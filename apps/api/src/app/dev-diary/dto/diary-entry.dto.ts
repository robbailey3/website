import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsDate, IsEmpty, IsString } from 'class-validator';
import { ObjectID } from 'mongodb';

export class DiaryEntryDto {
  @ApiProperty()
  @IsEmpty()
  @Type(() => String)
  public _id: ObjectID;

  @ApiProperty()
  @IsString()
  public title: string;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  public date: Date;

  @ApiProperty()
  @IsString()
  public summary: string;

  @ApiProperty()
  @IsBoolean()
  public isHighlight: boolean;

  @ApiProperty()
  @IsArray()
  public difficulties: string[];

  @ApiProperty()
  @IsArray()
  public thingsLearned: string[];
}
