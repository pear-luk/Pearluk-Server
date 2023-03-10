import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AnswerModule } from './answer/answer.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArchiveModule } from './archive/archive.module';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { CategoryModule } from './category/category.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { configOption } from './common/options/config.option';
import { LoginModule } from './login/login.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { QuestionModule } from './question/question.module';
import { UploadModule } from './upload/upload.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot(configOption),
    LoginModule,
    AuthModule,
    UserModule,
    ArchiveModule,
    CategoryModule,
    ProductModule,
    OrderModule,
    QuestionModule,
    AnswerModule,
    CartModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
