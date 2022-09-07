import { IsNotEmpty } from 'class-validator';

export class ReqDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  price: number;

  constructor(partial: Partial<ReqDto>) {
    Object.assign(this, partial);
  }
}
