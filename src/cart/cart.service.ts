import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shopping_records } from './entity/shops.records.entity';
import { ReqCart } from './dto/reqcart.dto';
import { Product } from 'src/product/entity/product.entity';
import { ResCart } from './dto/rescart.dto';
import { User } from 'src/user/entity/user.entity';
import { resjoinDTO } from './dto/resjoin.dto';
import { resBuyerDTO } from './dto/resbuyer.dto';
import { Bio } from 'src/user/entity/bio.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Product)
    private productService: Repository<Product>,
    @InjectRepository(User)
    private userService: Repository<User>,
    @InjectRepository(Bio)
    private bioService: Repository<Bio>,
    @InjectRepository(Shopping_records)
    private cartService: Repository<Shopping_records>,
  ) {}

  async addTOCart(reqcart: ReqCart): Promise<ResCart> {
    const findproduct = await this.productService.findOne({
      where: { id: reqcart.productId },
    });
    if (!findproduct) {
      throw new HttpException('Product not found', HttpStatus.BAD_REQUEST);
    }
    const findUser = await this.userService.findOne({
      where: { id: reqcart.userId },
    });
    if (!findUser) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    const record = new Shopping_records();
    record.productId = reqcart.productId;
    record.userId = reqcart.userId;
    const order = await this.cartService.save(record);
    return new ResCart({
      userId: order.userId,
      productId: order.productId,
      orderDate: order.created_at,
    });
  }

  async viewCart(): Promise<resjoinDTO[]> {
    const getAll = await this.cartService
      .createQueryBuilder('shopping_record')
      .innerJoinAndSelect('shopping_record.user', 'user')
      .innerJoinAndSelect('shopping_record.product', 'product')
      .getMany();
    return getAll.map((x) => {
      return new resjoinDTO({
        orderId: x.id,
        userId: x.userId,
        productId: x.productId,
        username: x.user.username,
        productName: x.product.name,
        order_date: x.created_at,
      });
    });
  }

  async viewBuyer(): Promise<resBuyerDTO[]> {
    const buyer = await this.userService
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.username',
        'bio.id',
        'bio.fullname',
        'bio.address',
        'shopping_record.id',
        'shopping_record.created_at',
        'shopping_record.updated_at',
        'product.id',
        'product.name',
        'product.price',
      ])
      .innerJoin('user.bio', 'bio')
      .innerJoin('user.shopping_record', 'shopping_record')
      .innerJoin('shopping_record.product', 'product')
      .where('user.id = :id', { id: 1 })
      .getMany();

    return buyer.map((x) => {
      return new resBuyerDTO({
        Id: x.id,
        username: x.username,
        fullname: x.bio.fullname,
        address: x.bio.address,
        phoneNumber: x.bio.phoneNumber,
        shopping_records: x.shopping_record.map((y) => {
          return {
            id: y.id,
            product: y.product.name,
            price: y.product.price,
            orderAt: y.created_at,
          };
        }),
      });
    });
  }
}
