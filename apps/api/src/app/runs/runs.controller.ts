import {
  Controller,
  Get,
  NotImplementedException,
  Query,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { EntityQuery } from '../shared/entity-query/entity-query';
import { RunDto } from './dto/run.dto';
import { RunsService } from './runs.service';

@Controller('runs')
export class RunsController {
  constructor(private readonly runsService: RunsService) {}

  @Get('')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  public getRuns(@Query() query: EntityQuery<RunDto>) {
    const { filter, ...options } = query;
    return this.runsService.find(filter, options);
  }
}
