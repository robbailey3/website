import {
  Controller,
  Get,
  NotImplementedException,
  Query
} from '@nestjs/common';
import { EntityQuery } from '../shared/entity-query/entity-query';
import { RunDto } from './dto/run.dto';

@Controller('runs')
export class RunsController {
  @Get('')
  public getRuns(@Query() query: EntityQuery<RunDto>) {
    return new NotImplementedException();
  }
}
