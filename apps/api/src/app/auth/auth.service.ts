import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { UpdateWriteOpResult } from 'mongodb';
import { map } from 'rxjs/operators';
import { UserDto } from '../users/dto/user.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  private readonly BRUTE_TIMEOUT = 1000 * 60 * 0.5; // 15 minutes

  private readonly MAX_ATTEMPTS = 5;

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  /**
   * This method is primarily used by the Passport 'local' strategy to login a user.
   * @param email The email address of the user
   * @param pass The password of the user. NOTE: This should NEVER be exposed to any logs or anything. Ever.
   */
  public async validateUser(
    email: string,
    pass: string
  ): Promise<Partial<UserDto>> {
    try {
      const user = await this.usersService
        .findOne<UserDto>({ email })
        .toPromise();

      if (!user || !user.password) {
        throw new UnauthorizedException();
      }

      if (this.checkBruteForce(user)) {
        throw new UnauthorizedException();
      }

      const passwordIsCorrect = await bcrypt.compare(pass, user.password);

      if (!passwordIsCorrect) {
        await this.recordLoginAttempt(user).toPromise();
        throw new UnauthorizedException();
      }

      const { password, ...result } = user;

      return result;
    } catch {
      throw new UnauthorizedException();
    }
  }

  /**
   * This method returns a JWT token for a user who has successfully logged in. This, hopefully, will be me ()
   * @param loginUser The email and password object
   */
  public async login(loginUser: LoginDto): Promise<any> {
    const user = await this.usersService
      .findOneAndUpdate<UserDto>(
        { email: loginUser.email },
        { $set: { lastLogIn: new Date() } },
        { upsert: true }
      )
      .toPromise();

    if (!user) {
      // This shouldn't happen, but just in case.
      throw new UnauthorizedException('Login Failed');
    }

    // Create the JWT Payload
    const payload: Partial<UserDto> = {
      email: user.email,
      // eslint-disable-next-line no-underscore-dangle
      _id: user._id
    };

    return {
      token: this.jwtService.sign(payload, {
        expiresIn: '1h'
      })
    };
  }

  /**
   * Update a user document to record a failed login attempt
   * @param {UserDto} user
   * @return {*}  {Observable<UpdateWriteOpResult>}
   */
  public recordLoginAttempt(user: UserDto): Observable<UpdateWriteOpResult> {
    return this.usersService.updateOne<UserDto>(user, {
      $push: { failedLogins: Date.now() }
    });
  }

  /**
   * Check if the user is currently locked out of their account.
   * @param {UserDto} user
   * @return {*}  {boolean}
   */
  public checkBruteForce(user: UserDto): boolean {
    return (
      user.failedLogins?.filter(
        (failedLogin) => failedLogin > Date.now() - this.BRUTE_TIMEOUT
      ).length > this.MAX_ATTEMPTS
    );
  }
}
