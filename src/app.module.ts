import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductModule } from './modules/products.module';
import { UsersModule } from './modules/users.module';
import { User } from './entities/user.entity';
import { AuthController } from './controllers/auth.controller';
import { AuthModule } from './modules/auth.module';
import { AuthGuard } from './guards/auth.guard';

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
      }), ProductModule, UsersModule, AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, AuthGuard],
})
export class AppModule {}
