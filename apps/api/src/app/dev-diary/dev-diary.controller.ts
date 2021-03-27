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
import { ApiBody } from '@nestjs/swagger';
import { ObjectID } from 'mongodb';
import { Observable } from 'rxjs';
import { EntityQuery } from '../shared/entity-query/entity-query';
import { DevDiaryService } from './dev-diary.service';
import { DiaryEntryDto } from './dto/diary-entry.dto';

@Controller('dev-diary')
export class DevDiaryController {
  constructor(private readonly devDiaryService: DevDiaryService) {}

  @Get('')
  public getEntries(
    @Query() query: EntityQuery<DiaryEntryDto>
  ): Observable<DiaryEntryDto[]> {
    const { filter, ...options } = query;
    return this.devDiaryService.find<DiaryEntryDto>(filter, options);
  }

  @Get(':id')
  public getSingleEntry(@Param('id') id: string) {
    if (!ObjectID.isValid(id)) {
      throw new BadRequestException('Provided id must be a valid id');
    }
    return this.devDiaryService.findOne<DiaryEntryDto>({
      _id: ObjectID.createFromHexString(id)
    });
  }

  @Post('')
  public createEntry(@Body() newEntry: DiaryEntryDto) {
    return this.devDiaryService.insertOne(newEntry);
  }

  @Patch(':id')
  @ApiBody({ type: DiaryEntryDto })
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
  public deleteEntry(@Param('id') id: string) {
    if (!ObjectID.isValid(id)) {
      throw new BadRequestException('Provided id must be a valid id');
    }
    return this.devDiaryService.deleteOne({
      _id: ObjectID.createFromHexString(id)
    });
  }
}
