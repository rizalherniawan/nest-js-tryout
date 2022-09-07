import { IsNotEmpty, Length, NotContains } from 'class-validator';

export class loginDTO {
  @Length(5, 8)
  @NotContains(' ')
  @IsNotEmpty()
  username: string;

  token: string;

  @Length(8, 10)
  @NotContains(' ')
  @IsNotEmpty()
  password: string;

  constructor(partial: Partial<loginDTO>) {
    Object.assign(this, partial);
  }
}

export class responseLoginDTO {
  id: number;
  username: string;
  token: string;
  constructor(partial: Partial<responseLoginDTO>) {
    Object.assign(this, partial);
  }
}
