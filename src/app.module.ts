import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from 'src/modules/product/product.module';
import { ConfigModule } from '@nestjs/config';
import { envValidationSchema } from 'src/config/env-validation';

@Module({
  imports: [
    ProductModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidationSchema,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
