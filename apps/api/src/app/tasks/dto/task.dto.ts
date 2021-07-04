import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min
} from 'class-validator';
import { BaseEntity } from '../../shared/base-entity/base-entity';

export enum TaskStatus {
  NotStarted,
  InProgress,
  Stuck,
  Complete
}

export class TaskDto extends BaseEntity {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public task: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(5)
  @IsNotEmpty()
  public priority: number;

  @ApiProperty()
  @IsEnum(TaskStatus)
  public status: TaskStatus;
}
