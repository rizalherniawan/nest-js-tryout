import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BaseResponseDto } from 'src/common/response/response';
import { CartService } from './cart.service';
import { ReqCart } from './dto/reqcart.dto';
import { ResCart } from './dto/rescart.dto';
import { resjoinDTO } from './dto/resjoin.dto';

@Controller('cart')
export class CartController {
  constructor(private cartservice: CartService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async addCart(@Body() reqcart: ReqCart): Promise<BaseResponseDto<ResCart>> {
    const ordered = await this.cartservice.addTOCart(reqcart);
    if (!ordered) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return new BaseResponseDto({
      success: true,
      data: ordered,
      message: 'order success',
    });
  }

  @Get()
  async getCart(): Promise<BaseResponseDto<resjoinDTO[]>> {
    const viewAll = await this.cartservice.viewCart();
    return new BaseResponseDto({
      success: true,
      data: viewAll,
      message: 'Success retrieving data',
    });
  }

  @Get('buyer')
  async getbuyer(): Promise<any> {
    const buyer = await this.cartservice.viewBuyer();
    return buyer;
  }
}
