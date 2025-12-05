export class CreateOrderOutputDto {
    orderId: string;
    status: string;
    totalAmount: number;
    paymentMethod: string;
    customerId: string;
    items: Array<{
        productId: string;
        quantity: number;
        unitPrice: number;
        totalPrice: number;
    }>;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        orderId: string,
        status: string,
        totalAmount: number,
        paymentMethod: string,
        customerId: string,
        items: Array<{
            productId: string;
            quantity: number;
            unitPrice: number;
            totalPrice: number;
        }>,
        createdAt: Date,
        updatedAt: Date
    ) {
        this.orderId = orderId;
        this.status = status;
        this.totalAmount = totalAmount;
        this.paymentMethod = paymentMethod;
        this.customerId = customerId;
        this.items = items;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}