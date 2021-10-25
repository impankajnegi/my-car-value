import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {TypeOrmModule} from '@nestjs/typeorm'
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { CurrentUsseInterceptor } from './interceptors/current-user.interceptor';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, AuthService, CurrentUsseInterceptor]
})
export class UsersModule {}
