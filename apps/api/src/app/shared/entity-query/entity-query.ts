import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNumber,
  isObject,
  IsOptional,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { FilterQuery, SortOptionObject } from 'mongodb';

export class EntityQuery<T> {
  @Type(() => Number)
  @IsNumber(
    { maxDecimalPlaces: 0 },
    { message: 'Limit must be a number between 1 and 100' }
  )
  @Min(0)
  @Max(100)
  @IsOptional()
  @ApiProperty({
    required: false,
    name: 'limit',
    description: 'The number of results to retrieve.',
    default: 100,
  })
  public limit: number;

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Skip must be a number' })
  @IsOptional()
  @ApiProperty({
    required: false,
    name: 'skip',
    description: 'The number of results to skip (useful for pagination).',
    default: 0,
  })
  public skip: number;

  @IsOptional()
  @ApiProperty({
    required: false,
    name: 'filter',
    description:
      'A JSON representation of a MongoDB filter. E.g. { "title": { "$eq": "Hello" }}',
  })
  public filter: FilterQuery<T>;

  @IsOptional()
  @ApiProperty({
    required: false,
    name: 'sort',
    description: 'How to sort the results',
  })
  public sort: SortOptionObject<T>;
}
