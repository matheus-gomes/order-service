import { randomUUID } from "crypto";
import { Order, OrderPaymentMethod } from "../domain/order.domain";
import { CreateOrderInputDto } from "../dto/createOrderInputDTO";
import { OrderItem } from "src/orderItem/domain/orderItem.domain";

export class OrderFactory {
    static createFromDto(dto: CreateOrderInputDto): Order {
        const items = dto.items.map(item => 
            new OrderItem(
                item.productId,
                item.quantity,
                item.unitPrice
            )
        );

        const order = new Order(
            items,
            dto.paymentMethod as OrderPaymentMethod,
            dto.customerId
        );

        return order;
    }
}