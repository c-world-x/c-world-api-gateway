import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ServiceNames } from 'src/common/constants/services.constants';
import { ConfigService } from '@nestjs/config';
import { OrderController } from 'src/modules/order/order.controller';
import { QueueNames } from 'src/common/constants';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: ServiceNames.ORDER_SERVICE,
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBITMQ_URL')],
            queue: QueueNames.ORDER_QUEUE,
            queueOptions: {
              durable: true,
            },
          },
        }),
      },
    ]),
  ],
  controllers: [OrderController],
  providers: [],
})
export class OrderModule {}
