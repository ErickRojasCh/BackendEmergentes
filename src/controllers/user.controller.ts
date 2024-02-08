// src/users/users.controller.ts

import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserService } from 'src/services/user.service';
import { User } from 'src/entities/user.entity';
import { ApiTags, ApiBearerAuth, ApiResponse, ApiBody, ApiOperation } from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth()

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Registrar Nuevo Usuario' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'UsuarioX' },
        email: { type: 'string', example: 'usuario2ejemplo@example.com' },
        password: { type: 'string', example: 'password' },
      
      },
    },
    description: 'Aqui se registra Usuarios',
  })
  @ApiResponse({ status: 201, description: 'Usuario Registrado' })
  @Post()
  async createUser(@Body() userData: Partial<User>): Promise<User> {
    return this.userService.createUser(userData);
  }
  
  @Get()
  async findAllUsers(): Promise<User[]> {
    return this.userService.findAllUsers();
  }
}


