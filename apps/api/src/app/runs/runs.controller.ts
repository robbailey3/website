import {
  Controller,
  Get,
  NotImplementedException,
  Query
} from '@nestjs/common';
import { DatabaseService } from '../shared/database/database.service';
import { EntityQuery } from '../shared/entity-query/entity-query';
import { RunDto } from './dto/run.dto';
import { RunsService } from './runs.service';

@Controller('runs')
export class RunsController {
  constructor(private readonly runsService: RunsService) {}

  @Get('')
  public getRuns(@Query() query: EntityQuery<RunDto>) {
    const { filter, ...options } = query;
    return this.runsService.find(filter, options);
  }
}
