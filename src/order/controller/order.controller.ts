import { Body, Controller, Post } from '@nestjs/common';
import { OrderService } from '../service/order.service';
import { CreateOrderInputDto } from '../dto/createOrderInputDTO';

@Controller('order')
export class OrderController {
    constructor(private orderService: OrderService) {}

    @Post()
    async createOrder(
        @Body() createOrderInputDTO: CreateOrderInputDto
    ) {
        return this.orderService.createOrder(createOrderInputDTO);
    } 
}
