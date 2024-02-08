import { Request } from 'express';
import { User } from './entities/user.entity'; // Asegúrate de importar el tipo de usuario adecuado

declare module 'express' {
  interface Request {
    user?: User; // Agrega la propiedad 'user' al objeto de solicitud
  }
}
