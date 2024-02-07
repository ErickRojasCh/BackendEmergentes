import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "root",
      database: "dbemergentes",
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true, // Esto crea automáticamente las tablas en la base de datos (solo para desarrollo)
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
