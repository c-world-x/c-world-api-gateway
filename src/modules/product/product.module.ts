import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ServiceNames } from 'src/common/constants/services.constants';
import { ProductController } from 'src/modules/product/product.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: ServiceNames.PRODUCT_SERVICE,
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            port: configService.get<number>('PRODUCT_SERVICE_PORT'),
          },
        }),
      },
    ]),
  ],
  controllers: [ProductController],
  providers: [],
})
export class ProductModule {}
