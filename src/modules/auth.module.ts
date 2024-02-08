// src/auth/auth.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from 'src/controllers/auth.controller';
//import { AuthService } from './auth.service';
import { UsersModule } from './users.module';// Importar UsersModule
import { User } from '../entities/user.entity'; // Asumiendo que tienes una entidad User en 'src/entities/user.entity'

@Module({
  imports: [
    UsersModule, // Importar UsersModule
    TypeOrmModule.forFeature([User]) // Asumiendo que estás utilizando TypeORM
  ],
  controllers: [AuthController],
  providers: [],
})
export class AuthModule {}
