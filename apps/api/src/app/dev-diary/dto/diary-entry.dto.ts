import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsDate, IsString } from 'class-validator';
import { BaseEntity } from '../../shared/base-entity/base-entity';

export class DiaryEntryDto extends BaseEntity {
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
