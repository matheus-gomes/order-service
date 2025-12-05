import { EventPattern, Payload } from "@nestjs/microservices";
import { OrderService } from "../service/order.service";
import { Controller } from "@nestjs/common";

@Controller()
export class OrderEventsHandler {
    constructor(private readonly orderService: OrderService) { }

    @EventPattern('inventory.reserved')
    async handleInventoryReserved(@Payload() data: any) {
        const { orderId } = data;

        await this.orderService.markInventoryReserved(orderId);
    }
}