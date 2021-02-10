import { IsIn, IsNotEmpty } from 'class-validator';

const validLocationTypes = [
  'Point',
  'Polygon',
  'LineString',
  'MultiLineString',
  'GeometryCollection'
];

export class LocationDto {
  @IsIn(validLocationTypes)
  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  coordinates: number[] | number[][] | number[][][];
}
