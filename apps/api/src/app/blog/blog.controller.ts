import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  Logger,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
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
import { BlogPostDto } from './dto/blogpost.dto';
import { UpdateBlogPostDto } from './dto/update-blogpost.dto';

@Controller('blog')
@ApiTags('Blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get('')
  @ApiOperation({
    description: 'Find blog posts',
    summary: 'Find blog posts'
  })
  @ApiOkResponse({
    type: [BlogPostDto],
    description: 'An array of matching blog posts'
  })
  public getPosts(@Query() query: EntityQuery<BlogPostDto>) {
    const { filter, ...options } = query;
    return this.blogService.find<BlogPostDto>(filter, options);
  }

  @Get(':id')
  @ApiOperation({
    description: 'Find blog post by its ID',
    summary: 'Find Post by ID'
  })
  @ApiOkResponse({
    type: BlogPostDto,
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
      .findOne<BlogPostDto>({ _id: ObjectID.createFromHexString(id) })
      .pipe(
        map((result) => {
          if (!result) {
            throw new NotFoundException('Blog post not found');
          }
          return result;
        })
      );
  }

  @Post('')
  @ApiCreatedResponse({
    description: 'Returns the inserted document',
    type: BlogPostDto
  })
  @ApiBadRequestResponse({
    description:
      'A 400 response is returned when the body is invalid and details of the errors are returned'
  })
  @ApiOperation({
    description: 'Insert a new blog post into the database',
    summary: 'Insert blog post'
  })
  public insertPost(@Body() body: BlogPostDto) {
    const newPost = {
      slug: this.blogService.slugifyTitle(body.title),
      ...body
    };
    return this.blogService.countDocuments({ slug: newPost.slug }).pipe(
      switchMap((count) => {
        if (count > 0) {
          return throwError(
            new ConflictException('Post with specified slug already exists')
          );
        }
        return this.blogService.insertOne<BlogPostDto>(newPost);
      })
    );
  }

  @Patch('publish/:id')
  @ApiOperation({
    description: 'Toggle the published status of a post',
    summary: 'Toggle published status'
  })
  @ApiOkResponse({
    description: 'Returns the modified document',
    type: BlogPostDto
  })
  @ApiBadRequestResponse({
    description: 'A 400 bad response is returned when an invalid ID is provided'
  })
  @ApiNotFoundResponse({
    description:
      'A 404 response is returned when no document is found with the provided ID'
  })
  public publishPost(@Param('id') id: string) {
    if (!ObjectID.isValid(id)) {
      throw new BadRequestException('Provided id must be a valid id');
    }
    return this.blogService
      .findOne<BlogPostDto>({
        _id: ObjectID.createFromHexString(id)
      })
      .pipe(
        switchMap((doc) => {
          if (!doc) {
            return throwError(new NotFoundException('Blog post not found'));
          }
          const update = {
            isPublished: !doc.isPublished,
            datePublished: !doc.isPublished ? new Date() : doc.datePublished
          };
          return this.blogService.findOneAndUpdate<BlogPostDto>(
            { _id: doc._id },
            {
              $set: update
            }
          );
        })
      );
  }

  @Patch(':id')
  @ApiOperation({
    description: 'Update a post document',
    summary: 'Update post'
  })
  @ApiOkResponse({
    description: 'Returns the updated blog post document',
    type: [BlogPostDto]
  })
  @ApiBadRequestResponse({
    description: 'A 400 bad response is returned when an invalid ID is provided'
  })
  @ApiBody({ type: BlogPostDto, description: 'The updated blog post' })
  public updatePost(@Param('id') id: string, @Body() body: UpdateBlogPostDto) {
    if (!ObjectID.isValid(id)) {
      throw new BadRequestException('Provided id must be a valid id');
    }
    return this.blogService
      .findOne<BlogPostDto>({ _id: ObjectID.createFromHexString(id) })
      .pipe(
        switchMap((doc) => {
          if (!doc) {
            return throwError(new NotFoundException('Blog post not found'));
          }
          const updatedPost = body.title
            ? {
                slug: this.blogService.slugifyTitle(body.title),
                ...body
              }
            : body;
          return this.blogService.findOneAndUpdate(
            {
              _id: doc._id
            },
            { $set: { ...updatedPost } }
          );
        })
      );
  }

  @Delete(':id')
  @ApiOperation({
    description: 'Delete a document by its ID',
    summary: 'Delete document'
  })
  @ApiOkResponse({ type: BlogPostDto, description: 'The deleted document' })
  @ApiBadRequestResponse({
    description: 'A 400 bad response is returned when an invalid ID is provided'
  })
  public deletePost(@Param('id') id: string) {
    if (!ObjectID.isValid(id)) {
      throw new BadRequestException('Provided id must be a valid id');
    }
    return this.blogService
      .findOne<BlogPostDto>({
        _id: ObjectID.createFromHexString(id)
      })
      .pipe(
        switchMap((doc) => {
          if (!doc) {
            return throwError(new NotFoundException('Blog post not found'));
          }
          return this.blogService.findOneAndDelete<BlogPostDto>({
            _id: doc._id
          });
        })
      );
  }
}
