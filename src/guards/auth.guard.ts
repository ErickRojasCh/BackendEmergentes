// src/auth/auth.guard.ts

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    // Verificar si el usuario está autenticado
    if (!request.user) {
      return false; // Rechazar la solicitud si el usuario no está autenticado
    }
    return true; // Permitir el acceso si el usuario está autenticado
  }
}
