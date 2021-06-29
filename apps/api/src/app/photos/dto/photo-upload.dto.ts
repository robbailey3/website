import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../shared/base-entity/base-entity';

export class PhotoUploadDto extends BaseEntity {
  @ApiProperty({ type: 'string', format: 'binary' })
  files: any;
}
