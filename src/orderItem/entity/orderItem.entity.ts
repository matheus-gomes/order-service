import { OrderEntity } from "src/order/entity/order.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

@Entity('order_items')
export class OrderItemEntity {
    @PrimaryColumn('uuid')
    id: string;

    @Column({ type: 'uuid', name: 'order_id' })
    orderId: string;

    @Column({ type: 'uuid', name: 'product_id' })
    productId: string;

    @Column({ type: 'int', name: 'quantity' })
    quantity: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, name: 'unit_price' })
    unitPrice: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, name: 'total_price' })
    totalPrice: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP', name: 'updated_at' })
    updatedAt: Date;

    @ManyToOne(() => OrderEntity, order => order.items)
    @JoinColumn({ name: 'order_id' })
    order?: OrderEntity;
}