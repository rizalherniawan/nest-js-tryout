import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ReqDto } from './dto/req.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  private prodService;
  constructor(product: ProductService) {
    this.prodService = product;
  }
  @Get('')
  getProd() {
    return this.prodService.findAll();
  }

  @Post('')
  postDt(@Body() reqdto: ReqDto) {
    return this.prodService.postData(reqdto);
  }

  @Get('/:id')
  getById(@Param() param: { id: number }) {
    return this.prodService.findById(param.id);
  }
}
