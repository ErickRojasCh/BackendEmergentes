import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductModule } from './modules/products.module';
import { UsersModule } from './modules/users.module';
import { User } from './entities/user.entity';
import { AuthModule } from './modules/auth.module';
import { AuthGuard } from './guards/auth.guard';
import { AuthMiddleware } from './middleware/auth.middleware';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10), // Asegúrate de convertir el puerto a un número entero
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Product, User],
      synchronize: true,
    }), ProductModule, UsersModule, AuthModule,
    JwtModule.register({})
  ],
  controllers: [],
  providers: [AuthGuard],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*'); // Aplicar el middleware de autenticación a todas las rutas
  }
}
