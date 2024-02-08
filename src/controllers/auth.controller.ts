// src/users/auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/services/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiOperation({ summary: 'Iniciar Sesion' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'usuario2ejemplo@example.com' },
        password: { type: 'string', example: 'contraseña123' },
      },
    },
    description: 'Aqui se Inicia Sesion',
  })
  @ApiResponse({ status: 201, description: 'Sesion Iniciada' })
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }
}
