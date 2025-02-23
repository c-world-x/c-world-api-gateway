import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from 'src/modules/product/product.module';
import { ConfigModule } from '@nestjs/config';
import { envValidationSchema } from 'src/configs/env-validation';
import { OrderModule } from 'src/modules/order/order.module';

@Module({
  imports: [
    ProductModule,
    OrderModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidationSchema,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
