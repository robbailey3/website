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
  ApiOperation,
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
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('')
  @ApiOkResponse({ type: [UserDto] })
  @UseInterceptors(QueryParserInterceptor)
  @ApiOperation({ description: 'Finds users', summary: 'Find Users' })
  public async find(@Query() query: EntityQuery<UserDto>): Promise<UserDto[]> {
    const { filter, ...options } = query;
    const users = await this.userService.find<UserDto>(filter, options);

    return users.map((user) => plainToClass(UserDto, user));
  }

  @Post('')
  @ApiBody({ type: UserDto })
  @ApiOperation({
    description: 'Inserts a user into the database',
    summary: 'Insert User'
  })
  public async insertUser(@Body() user: UserDto) {
    const newUser = await this.userService.insertUser(user);

    return plainToClass(UserDto, newUser);
  }
}
