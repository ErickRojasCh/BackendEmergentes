import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private logger = new Logger('AuthMiddleware');

  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1]; // Obtener el token JWT de los encabezados de la solicitud
    if (token) {
      try {
        const decoded = this.jwtService.verify(token); // Verificar y decodificar el token JWT
        req.user = decoded; // Establecer el usuario decodificado en el objeto de solicitud
        this.logger.log('User authenticated:', decoded); // Registrar información sobre el usuario autenticado
      } catch (error) {
        this.logger.error('Invalid token:', error.message); // Registrar información sobre el token inválido
      }
    }
    next();
  }
}
