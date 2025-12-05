import { Module } from '@nestjs/common';
import { OrderModule } from './order/order.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from 'config/database.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => databaseConfig(),
    }),
    OrderModule
  ],
})
export class AppModule {}
