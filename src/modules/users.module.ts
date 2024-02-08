// src/users/users.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/services/user.service';
import { UsersController } from 'src/controllers/user.controller';
import { AuthController } from 'src/controllers/auth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  controllers: [UsersController],
  exports: [UserService], // 
})
export class UsersModule {}
