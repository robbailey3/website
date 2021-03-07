import { ApiProperty } from '@nestjs/swagger';

export class PhotoUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  files: any;
}
