import { DataSource, Repository } from "typeorm";
import { OrderEntity } from "../entity/order.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "../domain/order.domain";
import { OrderMapper } from "../mapper/order.mapper";

@Injectable()
export class OrderRepository {

    constructor(
        @InjectRepository(OrderEntity)
        private readonly repository: Repository<OrderEntity>,
    ) { }

    async save(order: Order): Promise<void> {
        const entity = OrderMapper.toEntity(order);

        await this.repository.save(entity);
    }

    async update(order: Order): Promise<void> {
        const entity = OrderMapper.toEntity(order);

        await this.repository.update(entity.id, {
            id: entity.id,
            status: entity.status,
            totalAmount: entity.totalAmount,
            paymentMethod: entity.paymentMethod,
            customerId: entity.customerId,
        });
    }

    async findById(orderId: string): Promise<Order> {
        const entity = await this.repository.findOne({ where: { id: orderId } })

        return OrderMapper.toDomain(entity);
    }
}