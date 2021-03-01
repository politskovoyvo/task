import { UserEntity } from './entities/user.entity';

export const USER_REPOSITORY = 'USER_PROVIDER';

export const userProvider = [
  {
    provide: USER_REPOSITORY,
    useValue: UserEntity,
  },
];
