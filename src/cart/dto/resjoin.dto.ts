export class resjoinDTO {
  orderId: number;
  userId: number;
  productId: number;
  username: string;
  productName: string;
  order_date: string;
  constructor(partial: Partial<resjoinDTO>) {
    Object.assign(this, partial);
  }
}
