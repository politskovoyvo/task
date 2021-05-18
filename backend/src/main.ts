import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// @ts-ignore
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RedisIoAdapter } from './core/DB/redis/redis.adapter';
import { WsAdapter } from '@nestjs/platform-ws';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    // const redis = await app.connectMicroservice<MicroserviceOptions>({
    //     transport: Transport.REDIS,
    //     options: {
    //         url: 'redis://localhost:6379',
    //     },
    // });

    const config = new DocumentBuilder()
        .setTitle('intelliTracker')
        .setDescription('Документация Rest api')
        .setVersion('0.0.0')
        .build();

    // app.useWebSocketAdapter(new WsAdapter(app));
    app.useWebSocketAdapter(new RedisIoAdapter(app));

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);

    const options = {
        origin: ['http://localhost:4200', 'http://localhost:3000'],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
        credentials: true,
    };

    app.enableCors(options);
    app.use(cookieParser());

    // await app.startAllMicroservicesAsync();
    const port = parseInt(process.env.PORT, 10);
    await app.listen(port);
}

bootstrap();
