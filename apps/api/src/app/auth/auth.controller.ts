import {
  ApiBody,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiResponse
} from '@nestjs/swagger';

import { AuthGuard } from '@nestjs/passport';
import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    description:
      'Login endpoint. User logs in with their username and password.',
    summary: 'Authenticates a user with the API.'
  })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 201,
    description:
      'Login operation is successful and the user is granted an access token.'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UseGuards(AuthGuard('local'))
  @Post('login')
  public login(@Req() req: any) {
    return this.authService.login(req.user);
  }
}
