import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// @ts-ignore
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('intelliTracker')
        .setDescription('Документация Rest api')
        .setVersion('0.0.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);

    const options = {
        origin: ['http://localhost:4200', 'http://localhost:3000'],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
        credentials: true,
    };

    // const redis = await NestFactory.createMicroservice<MicroserviceOptions>(
    //     AppModule,
    //     {
    //         transport: Transport.REDIS,
    //         options: {
    //             url: 'redis://localhost:6379',
    //         },
    //     },
    // );

    app.enableCors(options);
    app.use(cookieParser());

    await app.listen(1234);
}

bootstrap();
