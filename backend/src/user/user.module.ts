import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { userProvider } from './user.provider';
import { TokenService } from '../share/services/token.service';

@Module({
  controllers: [UserController],
  imports: [
    // MongooseModule.forFeature([
    //   {
    //     name: TaskDb.name,
    //     schema: TaskSchema,
    //   },
    // ]),
  ],
  exports: [UserService],
  providers: [UserService, TokenService, ...userProvider],
})
export class UserModule {}
