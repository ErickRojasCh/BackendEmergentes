// src/auth/auth.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from 'src/controllers/auth.controller';
//import { AuthService } from './auth.service';
import { UsersModule } from './users.module';// Importar UsersModule
import { User } from '../entities/user.entity'; // Asumiendo que tienes una entidad User en 'src/entities/user.entity'
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/services/auth.service';


@Module({
  imports: [
    UsersModule, // Importar UsersModule
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
        secret: 'secreto', // Cambia 'secreto' por tu propia clave secreta
        signOptions: { expiresIn: '1h' }, // Opciones de firma del token
      }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
