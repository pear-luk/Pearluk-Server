import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configOption } from './common/options/config.option';

@Module({
  imports: [ConfigModule.forRoot(configOption), PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
