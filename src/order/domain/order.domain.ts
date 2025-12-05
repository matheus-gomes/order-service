import { randomUUID } from "crypto";
import { OrderItem } from "src/orderItem/domain/orderItem.domain";

export type OrderStatus = 'CREATED' | 'PENDING_PAYMENT' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
export type OrderPaymentMethod = 'PIX' | 'CREDIT_CARD' | 'PAYMENT_SLIP' | 'BANK_TRANSFER';

export class Order {
    private id: string;
    private status: OrderStatus;
    private items: OrderItem[];
    private totalAmount: number;
    private paymentMethod: OrderPaymentMethod;
    private customerId: string;
    private createdAt: Date;
    private updatedAt: Date;

    constructor(items: OrderItem[], paymentMethod: OrderPaymentMethod, userId: string) {
        this.id = randomUUID();
        this.status = 'CREATED';
        this.items = items;
        this.paymentMethod = paymentMethod;
        this.customerId = userId;
        this.createdAt = new Date();
        this.updatedAt = new Date();

        this.validate();

        this.calculateTotalAmount();
    }

    public getId(): string {
        return this.id;
    }

    public getStatus(): OrderStatus {
        return this.status;
    }

    public getItems(): OrderItem[] {
        return this.items;
    }

    public getTotalAmount(): number {
        return this.totalAmount;
    }

    public getPaymentMethod(): OrderPaymentMethod {
        return this.paymentMethod;
    }

    public getCustomerId(): string {
        return this.customerId;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }

    public getUpdatedAt(): Date {
        return this.updatedAt;
    }

    public setId(id: string): void {
        this.id = id;
    }

    public setStatus(status: OrderStatus): void {
        this.status = status;
        this.updatedAt = new Date();
    }

    public setCreatedAt(createdAt: Date): void {
        this.createdAt = createdAt;
    }

    public setUpdatedAt(updatedAt: Date): void {
        this.updatedAt = updatedAt;
    }

    private calculateTotalAmount(): void {
        this.totalAmount = this.items.reduce((total, item) => {
            const unitInCents = Math.round(item.getUnitPrice() * 100);
            const subtotalInCents = unitInCents * item.getQuantity();
            return total + subtotalInCents;
        }, 0) / 100;
    }

    public markInventoryReserved(): void {
        if (this.status !== 'CREATED') {
            throw new Error('Order must be CREATED to move to PENDING_PAYMENT.');
        }
        this.status = 'PENDING_PAYMENT';
        this.updatedAt = new Date();
    }

    public markInventoryFailed(): void {
        if (this.status !== 'CREATED') {
            throw new Error('Only orders in CREATED can fail due to inventory.');
        }
        this.status = 'CANCELLED';
        this.updatedAt = new Date();
    }

    public markAsPaid(): void {
        if (this.status !== 'PENDING_PAYMENT') {
            throw new Error('Order must be in PENDING_PAYMENT status to be marked as PAID.');
        }

        this.status = 'PAID';
        this.updatedAt = new Date();
    }

    public cancelOrder(): void {
        if (this.status === 'SHIPPED' || this.status === 'DELIVERED' || this.status === 'PAID') {
            throw new Error('Cannot cancel an order that is already SHIPPED, DELIVERED, or PAID.');
        }

        this.status = 'CANCELLED';
        this.updatedAt = new Date();
    }

    public setPendingPayment(): void {
        if (this.status !== 'CREATED') {
            throw new Error('Order must be in CREATED status to be set to PENDING_PAYMENT.');
        }

        this.status = 'PENDING_PAYMENT';
        this.updatedAt = new Date();
    }

    public getSummary(): any {
        return {
            id: this.id,
            status: this.status,
            totalAmount: this.totalAmount,
            paymentMethod: this.paymentMethod,
            customerId: this.customerId,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            items: this.items.map(item => ({
                productId: item.getProductId(),
                quantity: item.getQuantity(),
                unitPrice: item.getUnitPrice(),
                totalPrice: item.getTotalPrice(),
            })),
        };
    }


    private validate(): void {
        if (this.items.length === 0) {
            throw new Error('Order must contain at least one item.');
        }
    }
}