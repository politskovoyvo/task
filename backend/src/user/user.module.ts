import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { userProvider } from './user.provider';

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
  providers: [UserService, ...userProvider],
})
export class UserModule {}
