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
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ObjectID } from 'mongodb';
import { EntityQuery } from '../shared/entity-query/entity-query';
import { DevDiaryService } from './dev-diary.service';
import { DiaryEntryDto } from './dto/diary-entry.dto';

@Controller('dev-diary')
@ApiTags('Dev Diary')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class DevDiaryController {
  constructor(private readonly devDiaryService: DevDiaryService) {}

  @Get('')
  @ApiOperation({
    description: 'Fetches all diary entries',
    summary: 'Fetch Diary Entries'
  })
  public getEntries(
    @Query() query: EntityQuery<DiaryEntryDto>
  ): Promise<DiaryEntryDto[]> {
    const { filter, ...options } = query;
    return this.devDiaryService.find<DiaryEntryDto>(filter, options);
  }

  @Get(':id')
  @ApiOperation({
    description: 'Finds a single diary entry by its Id',
    summary: 'Find single diary entry'
  })
  public getSingleEntry(@Param('id') id: string) {
    if (!ObjectID.isValid(id)) {
      throw new BadRequestException('Provided id must be a valid id');
    }
    return this.devDiaryService.findOne<DiaryEntryDto>({
      _id: ObjectID.createFromHexString(id)
    });
  }

  @Post('')
  @ApiOperation({
    description: 'Inserts a new diary entry document into the database',
    summary: 'Insert diary entry'
  })
  public createEntry(@Body() newEntry: DiaryEntryDto) {
    return this.devDiaryService.insertOne(newEntry);
  }

  @Patch(':id')
  @ApiBody({ type: DiaryEntryDto })
  @ApiOperation({
    description: 'Updates an existing diary entry in the database',
    summary: 'Update diary entry'
  })
  public updateEntry(
    @Param('id') id: string,
    @Body() updatedEntry: Partial<DiaryEntryDto>
  ) {
    if (!ObjectID.isValid(id)) {
      throw new BadRequestException('Provided id must be a valid id');
    }
    return this.devDiaryService.findOneAndUpdate(
      { _id: ObjectID.createFromHexString(id) },
      { $set: { ...updatedEntry } }
    );
  }

  @Delete(':id')
  @ApiOperation({
    description: 'Deletes a diary entry from the database',
    summary: 'Delete diary entry'
  })
  public deleteEntry(@Param('id') id: string) {
    if (!ObjectID.isValid(id)) {
      throw new BadRequestException('Provided id must be a valid id');
    }
    return this.devDiaryService.findOneAndDelete({
      _id: ObjectID.createFromHexString(id)
    });
  }
}
