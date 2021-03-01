import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from './user.provider';
import { UserEntity } from './entities/user.entity';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly _userRepository: typeof UserEntity,
  ) {}

  async create(user: UserDto): Promise<UserEntity> {
    // @ts-ignore
    return await this._userRepository.create<UserEntity>(user);
  }

  async getAll(): Promise<UserEntity[]> {
    return this._userRepository.findAll<UserEntity>();
  }

  getUser(id: number): Promise<UserEntity> {
    return this._userRepository.findOne({
      where: { id },
      include: ['companies'],
    });
  }
}
