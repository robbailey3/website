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
import { Observable } from 'rxjs';
import { EntityQuery } from '../shared/entity-query/entity-query';
import { AddDateModified } from '../shared/utils/add-date-modified';
import { DevDiaryService } from './dev-diary.service';
import { DiaryEntryDto } from './dto/diary-entry.dto';

@Controller('dev-diary')
@ApiTags('Dev Diary')
export class DevDiaryController {
  constructor(private readonly devDiaryService: DevDiaryService) {}

  @Get('')
  @ApiOperation({ description: 'Fetches all diary entries' })
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
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  public createEntry(@Body() entry: DiaryEntryDto) {
    const newEntry = AddDateModified(entry);
    return this.devDiaryService.insertOne(newEntry);
  }

  @Patch(':id')
  @ApiBody({ type: DiaryEntryDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  public updateEntry(@Param('id') id: string, @Body() entry: DiaryEntryDto) {
    if (!ObjectID.isValid(id)) {
      throw new BadRequestException('Provided id must be a valid id');
    }
    const updatedEntry = AddDateModified(entry);
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
