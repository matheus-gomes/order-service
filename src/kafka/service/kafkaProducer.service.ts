import { Inject } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";

export class KafkaProducerService {
    constructor(@Inject('KAFKA_ORDER_PRODUCER') private readonly client: ClientKafka) { }

    async onModuleInit() {
        await this.client.connect();
    }

    async sendMessage(topic: string, message: any) {
        this.client.emit(topic, message);
    }
}