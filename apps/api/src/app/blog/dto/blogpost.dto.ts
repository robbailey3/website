import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmpty, IsNotEmpty, IsString } from 'class-validator';
import { BaseEntity } from '../../shared/base-entity/base-entity';

export class BlogPostDto extends BaseEntity {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public title: string;

  @ApiProperty()
  @IsEmpty()
  public slug: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public description: string;

  @ApiProperty()
  @IsBoolean()
  public isPublished: boolean;

  @ApiProperty()
  @IsEmpty()
  public datePublished: Date;

  @ApiProperty()
  @IsString()
  public content: string;
}
