import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ObjectID } from 'mongodb';
import { EntityQuery } from '../shared/entity-query/entity-query';
import { TaskDto } from './dto/task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
@ApiTags('Tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('')
  public getTasks(@Query() query: EntityQuery<TaskDto>) {
    const { filter, ...options } = query;
    return this.tasksService.find<TaskDto>(filter, options);
  }

  @Get(':id')
  public getTaskById(@Param('id') id: string) {
    if (!ObjectID.isValid(id)) {
      throw new BadRequestException('Provided id must be a valid id');
    }
    return this.tasksService.findOne<TaskDto>({
      _id: ObjectID.createFromHexString(id)
    });
  }

  @Post('')
  public insertTask(@Body() body: TaskDto) {
    return this.tasksService.insertOne<TaskDto>(body);
  }

  @Patch(':id')
  public updateTask(
    @Param('id') id: string,
    @Body() updatedTask: UpdateTaskDto
  ) {
    if (!ObjectID.isValid(id)) {
      throw new BadRequestException('Provided id must be a valid id');
    }
    return this.tasksService.findOneAndUpdate(
      { _id: ObjectID.createFromHexString(id) },
      { $set: { ...updatedTask } }
    );
  }

  @Delete(':id')
  public deleteTask(@Param('id') id: string) {
    if (!ObjectID.isValid(id)) {
      throw new BadRequestException('Provided id must be a valid id');
    }
    return this.tasksService.findOneAndDelete({
      _id: ObjectID.createFromHexString(id)
    });
  }
}
