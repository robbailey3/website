import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags
} from '@nestjs/swagger';
import { ObjectID } from 'mongodb';
import { EntityQuery } from '../shared/entity-query/entity-query';
import { TaskDto } from './dto/task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
@ApiTags('Tasks')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('')
  @ApiOperation({
    description: 'Find tasks',
    summary: 'Find tasks'
  })
  @ApiOkResponse({
    type: [TaskDto],
    description: 'An array of task documents'
  })
  public getTasks(@Query() query: EntityQuery<TaskDto>) {
    const { filter, ...options } = query;
    return this.tasksService.find<TaskDto>(filter, options);
  }

  @Get(':id')
  @ApiOperation({
    description: 'Find a task by its ID',
    summary: 'Find task by ID'
  })
  @ApiOkResponse({
    type: TaskDto,
    description: 'A single task document with an ID matching the provided ID'
  })
  @ApiBadRequestResponse({
    description: 'A 400 bad response is returned when an invalid ID is provided'
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The ID of the task document in the usual ObjectID Hex format'
  })
  public getTaskById(@Param('id') id: string) {
    if (!ObjectID.isValid(id)) {
      throw new BadRequestException('Provided id must be a valid id');
    }
    return this.tasksService.findOne<TaskDto>({
      _id: ObjectID.createFromHexString(id)
    });
  }

  @Post('')
  @ApiOperation({
    description: 'Insert a task document',
    summary: 'Insert task'
  })
  @ApiOkResponse({
    description: 'Returns the inserted task document',
    type: TaskDto
  })
  @ApiBadRequestResponse({
    description:
      'A 400 response is returned when the body is invalid and details of the errors are returned'
  })
  @ApiBody({ type: TaskDto, description: 'The updated task' })
  public insertTask(@Body() body: TaskDto) {
    return this.tasksService.insertOne<TaskDto>(body);
  }

  @Patch(':id')
  @ApiOperation({
    description: 'Update a task document',
    summary: 'Update task'
  })
  @ApiOkResponse({
    description: 'Returns the updated task document',
    type: TaskDto
  })
  @ApiBadRequestResponse({
    description: 'A 400 bad response is returned when an invalid ID is provided'
  })
  @ApiBody({ type: TaskDto, description: 'The updated task' })
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
  @ApiOperation({
    description: 'Delete a document by its ID',
    summary: 'Delete document'
  })
  @ApiOkResponse({ type: TaskDto, description: 'The deleted document' })
  @ApiBadRequestResponse({
    description: 'A 400 bad response is returned when an invalid ID is provided'
  })
  public deleteTask(@Param('id') id: string) {
    if (!ObjectID.isValid(id)) {
      throw new BadRequestException('Provided id must be a valid id');
    }
    return this.tasksService.findOneAndDelete({
      _id: ObjectID.createFromHexString(id)
    });
  }
}
