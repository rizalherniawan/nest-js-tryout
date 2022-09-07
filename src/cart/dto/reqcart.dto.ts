import { IsNotEmpty } from 'class-validator';

export class ReqCart {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  productId: number;

  constructor(partial: Partial<ReqCart>) {
    Object.assign(this, partial);
  }
}
