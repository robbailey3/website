import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_KEY'),
    });
  }

  /**
   * Based on the way JWT signing works,
   * we're guaranteed that we're receiving a valid token
   * that we have previously signed and issued to a valid user.
   * So this is the method which deals with a successfully validated
   * user with a nice valid JWT.
   *
   * @param payload
   * @returns
   */
  public async validate(payload: any) {
    return { id: payload.id, email: payload.email };
  }
}
