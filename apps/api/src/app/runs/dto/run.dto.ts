import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';
import { BaseEntity } from '../../shared/base-entity/base-entity';

export class RunDto extends BaseEntity {
  @IsNotEmpty()
  @IsDate()
  date: Date;

  @IsNotEmpty()
  @IsNumber()
  distance: number;

  @IsNotEmpty()
  @IsNumber()
  time: number;
}
