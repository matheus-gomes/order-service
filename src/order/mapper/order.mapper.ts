import { OrderItem } from "src/orderItem/domain/orderItem.domain";
import { Order, OrderStatus } from "../domain/order.domain";
import { OrderEntity } from "../entity/order.entity";

export class OrderMapper {
    static toEntity(order: Order): OrderEntity {
        return {
            id: order.getId(),
            customerId: order.getCustomerId(),
            status: order.getStatus(),
            paymentMethod: order.getPaymentMethod(),
            items: order.getItems().map(item => ({
                id: item.getId(),
                orderId: order.getId(),
                productId: item.getProductId(),
                quantity: item.getQuantity(),
                unitPrice: item.getUnitPrice(),
                totalPrice: item.getTotalPrice(),
                createdAt: item.getCreatedAt(),
                updatedAt: item.getUpdatedAt()
            })),
            totalAmount: order.getTotalAmount(),
            createdAt: order.getCreatedAt(),
            updatedAt: order.getUpdatedAt()
        }
    }

    static toDomain(entity: OrderEntity): Order {
        const order = new Order(
            entity.items.map(item => new OrderItem(
                item.productId,
                item.quantity,
                item.unitPrice
            )),
            entity.paymentMethod as any,
            entity.customerId
        );

        order.setId(entity.id);
        order.setStatus(entity.status as OrderStatus);
        order.setCreatedAt(entity.createdAt);
        order.setUpdatedAt(entity.updatedAt);

        return order;
    }
}