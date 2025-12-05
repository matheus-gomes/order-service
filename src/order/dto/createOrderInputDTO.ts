import {
    IsArray,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    IsUUID,
    ValidateNested,
    Min,
} from 'class-validator';
import { Type } from 'class-transformer';

class OrderItemDto {
    @IsUUID()
    @IsNotEmpty()
    productId: string;

    @IsNumber()
    @Min(1)
    quantity: number;

    @IsNumber()
    @Min(0)
    unitPrice: number;
}

export class CreateOrderInputDto {
    @IsUUID()
    @IsNotEmpty()
    customerId: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItemDto)
    items: OrderItemDto[];

    @IsString()
    @IsOptional()
    paymentMethod?: string;
}