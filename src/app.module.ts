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
      type: "mysql",
      host: "127.0.0.1",
      port: 3306,
      username: "root",
      password: "root",
      database: "dbemergentes",
      entities: [Product,User],
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
