export class ResCart {
  userId: number;

  productId: number;

  orderDate: string;

  constructor(partial: Partial<ResCart>) {
    Object.assign(this, partial);
  }
}
