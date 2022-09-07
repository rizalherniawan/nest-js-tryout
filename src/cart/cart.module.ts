import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/product/entity/product.entity';
import { Bio } from 'src/user/entity/bio.entity';
import { User } from 'src/user/entity/user.entity';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { Shopping_records } from './entity/shops.records.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, User, Bio, Shopping_records])],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}
