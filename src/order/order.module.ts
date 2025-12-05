import { Module } from '@nestjs/common';
import { OrderService } from './service/order.service';
import { OrderController } from './controller/order.controller';
import { OrderRepository } from './repository/order.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entity/order.entity';
import { KafkaModule } from 'src/kafka/kafka.module';
import { OrderEventsHandler } from './events/order-events.handler';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity]),
    KafkaModule
  ],
  providers: [
    OrderRepository,
    OrderService,
  ],
  controllers: [
    OrderController,
    OrderEventsHandler
  ],
  exports: [OrderService],
})
export class OrderModule {}
