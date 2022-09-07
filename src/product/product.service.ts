import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReqDto } from './dto/req.dto';
import { Product } from './entity/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productRepo.find();
  }

  postData(reqDto: ReqDto) {
    return this.productRepo.save(reqDto);
  }

  async findById(param): Promise<any> {
    const found = await this.productRepo.findOne({ where: { id: param } });
    if (!found) return 'product not found';
    return found;
  }
}
