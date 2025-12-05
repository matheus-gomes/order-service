import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { KafkaProducerService } from "./service/kafkaProducer.service";

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'KAFKA_ORDER_PRODUCER',
                transport: Transport.KAFKA,
                options: {
                    client: {
                        clientId: 'order-service',
                        brokers: ['localhost:9092'],
                    },
                    consumer: {
                        groupId: 'order-service-group'
                    },
                    producer: {
                        allowAutoTopicCreation: true,
                    },
                }
            }
        ])
    ],
    providers: [KafkaProducerService],
    exports: [KafkaProducerService],
})
export class KafkaModule {}