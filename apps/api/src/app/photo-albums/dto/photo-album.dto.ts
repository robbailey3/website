import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { BaseEntity } from '../../shared/base-entity/base-entity';

export class PhotoAlbumDto extends BaseEntity {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public name: string;
}
