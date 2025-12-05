import { OrderItemEntity } from "src/orderItem/entity/orderItem.entity";
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('orders')
export class OrderEntity {
    @PrimaryColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 50, name: 'status' })
    status: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, name: 'total_amount' })
    totalAmount: number;

    @Column({ type: 'varchar', length: 50, name: 'payment_method' })
    paymentMethod: string;

    @Column({ type: 'uuid', name: 'customer_id' })
    customerId: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP', name: 'updated_at' })
    updatedAt: Date;

    @OneToMany(() => OrderItemEntity, item => item.order, {
        cascade: true,
        eager: true,
    })
    items: OrderItemEntity[];
}