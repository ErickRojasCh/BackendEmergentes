// src/users/user.service.ts

import { Injectable, ConflictException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "src/entities/user.entity";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async createUser(userData: Partial<User>): Promise<User> {
    const { email, password } = userData;
    const existingUser = await this.userRepository.findOne({where:{email}});
    if (existingUser) {
      throw new ConflictException('El correo electrónico ya está registrado');
    }

    // Cifrar la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = this.userRepository.create({
      ...userData,
      password: hashedPassword, // Usar la contraseña cifrada
    });
    return this.userRepository.save(newUser);
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({where:{email} });
    if (user && await bcrypt.compare(password, user.password)) {
      // Si las contraseñas coinciden, devolver el usuario
      return user;
    }
    // Si no, devolver null
    return null;
  }
}
