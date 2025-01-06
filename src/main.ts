import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app.module";
import cookieParser from "cookie-parser";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(cookieParser());
    
    app.enableCors({
        origin: process.env.CLIENT_URL,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
        credentials: true,
    });

    await app.listen(5500);
}

bootstrap();