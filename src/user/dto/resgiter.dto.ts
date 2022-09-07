import { IsNotEmpty, Length, Matches, NotContains } from 'class-validator';

export class registerDTOUser {
  @Length(5, 8)
  @NotContains(' ')
  @IsNotEmpty()
  username: string;

  @Length(8, 10)
  @NotContains(' ')
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  fullName: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  @Matches(/^((\+)62|0)?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)
  phoneNumber: string;

  constructor(partial: Partial<registerDTOUser>) {
    Object.assign(this, partial);
  }
}

export class responseRegisterDTOUser {
  id: number;
  username: string;
  fullName: string;
  address: string;
  phoneNumber: string;
  constructor(partial: Partial<responseRegisterDTOUser>) {
    Object.assign(this, partial);
  }
}
