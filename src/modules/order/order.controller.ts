import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ServiceNames } from 'src/common/constants/services.constants';
import { CreateOrderDto } from 'src/modules/order/dto';

@Controller('orders')
export class OrderController {
  constructor(
    @Inject(ServiceNames.ORDER_SERVICE)
    private readonly orderService: ClientProxy,
  ) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    try {
      this.orderService.emit(
        {
          cmd: 'create-order',
        },
        createOrderDto,
      );
    } catch (err) {
      console.log(err);
    }

    return { message: '✅ Order received, processing soon' };
  }
}
