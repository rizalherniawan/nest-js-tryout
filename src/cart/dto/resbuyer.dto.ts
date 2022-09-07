export class resBuyerDTO {
  Id: number;
  username: string;
  fullname: string;
  address: string;
  phoneNumber: string;
  shopping_records: object;
  constructor(partial: Partial<resBuyerDTO>) {
    Object.assign(this, partial);
  }
}
