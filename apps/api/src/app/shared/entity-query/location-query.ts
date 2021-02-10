import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { EntityQuery } from './entity-query';

export class LocationQuery extends EntityQuery<void> {
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  @ApiProperty({ name: 'lat', required: true })
  lat: number;

  @IsNumber({ allowNaN: false })
  @IsNotEmpty()
  @Type(() => Number)
  @ApiProperty({ name: 'lng', required: true })
  lng: number;

  @IsNumber()
  @ApiProperty({ name: 'maxDistance', required: true })
  @Type(() => Number)
  maxDistance: number;

  @IsNumber()
  @ApiProperty({ name: 'minDistance', required: false })
  @Type(() => Number)
  minDistance: number;
}
