import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderInputDto } from '../dto/createOrderInputDTO';
import { OrderFactory } from '../factory/order.factory';
import { OrderRepository } from '../repository/order.repository';
import { OrderMapper } from '../mapper/order.mapper';
import { CreateOrderOutputDto } from '../dto/createOrderOutputDTO';
import { ClientKafka } from '@nestjs/microservices';
import { Order } from '../domain/order.domain';
import { KafkaProducerService } from 'src/kafka/service/kafkaProducer.service';

@Injectable()
export class OrderService {
    constructor(
        private readonly kafkaProducerService: KafkaProducerService,
        private readonly orderRepository: OrderRepository
    ) {}

    async createOrder(createOrderInputDTO: CreateOrderInputDto): Promise<any> {
        const order = OrderFactory.createFromDto(createOrderInputDTO);

        await this.orderRepository.save(order);

        this.publishOrderCreatedEvent(order);

        const summary = order.getSummary();

        return new CreateOrderOutputDto(
            summary.id,
            summary.status,
            summary.totalAmount,
            summary.paymentMethod,
            summary.customerId,
            summary.items,
            summary.createdAt,
            summary.updatedAt
        );
    }

    async markInventoryReserved(orderId: string) {
        const order = await this.orderRepository.findById(orderId);
        if (!order) throw new Error('Order not found');
    
        order.setStatus('PENDING_PAYMENT');
    
        await this.orderRepository.update(order);
    }

    private publishOrderCreatedEvent(order: Order): void {
        this.kafkaProducerService.sendMessage('order.created', {
            orderId: order.getId(),
            customerId: order.getCustomerId(),
            total: order.getTotalAmount(),
            createdAt: order.getCreatedAt().toISOString(),
            items: order.getItems().map(i => ({
                productId: i.getProductId(),
                quantity: i.getQuantity(),
                price: i.getUnitPrice(),
                totalPrice: i.getTotalPrice(),
            })),
        });
    }

}
