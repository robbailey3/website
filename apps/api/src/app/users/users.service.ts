import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DatabaseService } from '../shared/database/database.service';
import { UserDto } from './dto/user.dto';
import { EntityService } from '../shared/entity-service/entity.service';

@Injectable()
export class UsersService extends EntityService {
  constructor(database: DatabaseService) {
    super(database, 'users');
  }

  public insertUser(newUser: UserDto): Observable<UserDto> {
    return from(bcrypt.hash(newUser.password, 12)).pipe(
      switchMap((hashedPassword) => {
        const { password, ...userWithoutPassword } = newUser; // Use object destructuring to create a copy without password
        const user = {
          password: hashedPassword,
          ...userWithoutPassword
        } as UserDto;
        return super.insertOne<UserDto>(user);
      })
    );
  }
}
