import { Controller, Get, Post, Param, Body, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ServiceNames } from 'src/common/constants/services.constants';

@Controller('products')
export class ProductController {
  constructor(
    @Inject(ServiceNames.PRODUCT_SERVICE)
    private readonly productService: ClientProxy,
  ) {}

  @Get()
  async getProducts() {
    return this.productService.send(
      {
        cmd: 'get-products',
      },
      '',
    );
  }
}
