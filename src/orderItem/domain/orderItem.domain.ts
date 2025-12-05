import { randomUUID } from "crypto";

export class OrderItem {
    private id: string;
    private orderId: string;
    private productId: string;
    private quantity: number;
    private unitPrice: number;
    private createdAt: Date;
    private updatedAt: Date;

    constructor(productId: string, quantity: number, unitPrice: number) {
        this.id = randomUUID();
        this.productId = productId;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.createdAt = new Date();
        this.updatedAt = new Date();

        this.validate();
    }

    public getId(): string {
        return this.id;
    }

    public getProductId(): string {
        return this.productId;
    }

    public getQuantity(): number {
        return this.quantity;
    }

    public getUnitPrice(): number {
        return this.unitPrice;
    }

    public getTotalPrice(): number {
        return this.unitPrice * this.quantity;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }

    public getUpdatedAt(): Date {
        return this.updatedAt;
    }

    private validate(): void {
        if (this.quantity <= 0) {
            throw new Error('Quantity must be greater than zero.');
        }
        if (this.unitPrice < 0) {
            throw new Error('Unit price cannot be negative.');
        }
    }
}