import { TypeOrmModuleOptions } from "@nestjs/typeorm";

const databaseConfig = (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    schema: process.env.DATABASE_SCHEMA,
    entities: [
        __dirname + '/../**/entity/*.entity{.ts,.js}',
    ],
    synchronize: false,
});

export {
    databaseConfig,
};