import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags
} from '@nestjs/swagger';
import { ObjectID } from 'mongodb';
import { throwError } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { EntityQuery } from '../shared/entity-query/entity-query';
import { BlogService } from './blog.service';
import { BlogDto } from './dto/blog.dto';

@Controller('blog')
@ApiTags('Blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get('')
  @ApiOperation({
    description: 'Find Blog Posts',
    summary: 'Find Blog Posts'
  })
  @ApiOkResponse({
    type: [BlogDto],
    description: 'An array of matching blog posts'
  })
  public getPosts(@Query() query: EntityQuery<BlogDto>) {
    const { filter, ...options } = query;
    return this.blogService.find<BlogDto>(filter, options);
  }

  @Get(':id')
  @ApiOperation({
    description: 'Find Blog Post by its ID',
    summary: 'Find Post by ID'
  })
  @ApiOkResponse({
    type: BlogDto,
    description: 'A single blog post with an ID matching the provided ID'
  })
  @ApiBadRequestResponse({
    description: 'A 400 bad response is returned when an invalid ID is provided'
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The ID of the blog post in the usual ObjectID Hex format'
  })
  public getPostById(@Param('id') id: string) {
    if (!ObjectID.isValid(id)) {
      throw new BadRequestException('Provided id must be a valid id');
    }
    return this.blogService
      .findOne<BlogDto>({ _id: ObjectID.createFromHexString(id) })
      .pipe(
        map((result) => {
          if (!result) {
            throw new NotFoundException('Post not found');
          }
          return result;
        })
      );
  }

  @Post('')
  @ApiOperation({ description: 'Insert a new blog post into the database' })
  public insertPost(@Body() body: BlogDto) {
    const newPost = {
      slug: this.blogService.slugifyTitle(body.title),
      ...body
    };
    return this.blogService.insertOne<BlogDto>(newPost);
  }

  @Patch('publish/:id')
  @ApiOperation({ description: 'Publish post' })
  public publishPost(@Param('id') id: string) {
    if (!ObjectID.isValid(id)) {
      throw new BadRequestException('Provided id must be a valid id');
    }
    return this.blogService
      .findOne<BlogDto>({
        _id: ObjectID.createFromHexString(id)
      })
      .pipe(
        switchMap((doc) => {
          const update = {
            isPublished: !doc.isPublished,
            datePublished: !doc.isPublished ? new Date() : doc.datePublished
          };
          return this.blogService.findOneAndUpdate<BlogDto>(
            { _id: doc._id },
            {
              $set: update
            }
          );
        }),
        map((result) => {
          return result.value;
        })
      );
  }

  @Patch(':id')
  @ApiOperation({
    description: 'Update a post document',
    summary: 'Update post'
  })
  @ApiBody({ type: BlogDto, description: 'The updated blog post' })
  public updatePost(@Param('id') id: string, @Body() body: BlogDto) {
    if (!ObjectID.isValid(id)) {
      throw new BadRequestException('Provided id must be a valid id');
    }
    const updatedPost = {
      slug: this.blogService.slugifyTitle(body.title),
      ...body
    };
    return this.blogService
      .findOneAndUpdate(
        {
          _id: ObjectID.createFromHexString(id)
        },
        { $set: { ...updatedPost } }
      )
      .pipe(map((result) => result.value));
  }

  @Delete(':id')
  @ApiOperation({
    description: 'Delete a document by its ID',
    summary: 'Delete document'
  })
  @ApiOkResponse({ type: BlogDto, description: 'The deleted document' })
  public deletePost(@Param('id') id: string) {
    if (!ObjectID.isValid(id)) {
      throw new BadRequestException('Provided id must be a valid id');
    }
    return this.blogService
      .findOneAndDelete({
        _id: ObjectID.createFromHexString(id)
      })
      .pipe(map((result) => result.value));
  }
}
