import { plainToClass } from 'class-transformer';
import { map } from 'rxjs/operators';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiTags
} from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';
import { EntityQuery } from '../shared/entity-query/entity-query';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { QueryParserInterceptor } from '../shared/query-parser/query-parser.interceptor';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('')
  @ApiOkResponse({ type: [UserDto] })
  @UseInterceptors(QueryParserInterceptor)
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  public find(@Query() query: EntityQuery<UserDto>): Observable<UserDto[]> {
    const { filter, ...options } = query;
    return this.userService
      .find<UserDto>(filter, options)
      .pipe(map((users) => users.map((user) => plainToClass(UserDto, user))));
  }

  @Post('')
  @ApiBody({ type: UserDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  public insertUser(@Body() user: UserDto) {
    const newUser = user;
    newUser.dateModified = new Date();
    return this.userService
      .insertUser(user)
      .pipe(map((createdUser) => plainToClass(UserDto, createdUser)));
  }
}
