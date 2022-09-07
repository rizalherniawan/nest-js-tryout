import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { loginDTO, responseLoginDTO } from './dto/login.dto';
import { registerDTOUser, responseRegisterDTOUser } from './dto/resgiter.dto';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Bio } from './entity/bio.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userService: Repository<User>,
    @InjectRepository(Bio) private bioService: Repository<Bio>,
  ) {}

  async registUser(
    registerDtouser: registerDTOUser,
  ): Promise<responseRegisterDTOUser> {
    const findUser = await this.userService.findOne({
      where: { username: registerDtouser.username },
    });
    if (findUser) {
      throw new HttpException('user already existed', HttpStatus.BAD_REQUEST);
    }
    const findPhoneNumber = await this.bioService.findOne({
      where: { phoneNumber: registerDtouser.phoneNumber },
    });
    if (findPhoneNumber) {
      throw new HttpException(
        'phone number already existed',
        HttpStatus.BAD_REQUEST,
      );
    }
    const password = await bcrypt.hash(registerDtouser.password, 10);
    const user = new User();
    user.username = registerDtouser.username;
    user.password = password;
    const register = await this.userService.save(user);
    const bio = new Bio();
    bio.fullname = registerDtouser.fullName;
    bio.address = registerDtouser.address;
    bio.phoneNumber = registerDtouser.phoneNumber;
    bio.user = user;
    const createBio = await this.bioService.save(bio);
    return new responseRegisterDTOUser({
      id: register.id,
      username: register.username,
      fullName: createBio.fullname,
      address: createBio.address,
      phoneNumber: createBio.phoneNumber,
    });
  }

  async loginUser(loginDtoUser: loginDTO): Promise<responseLoginDTO> {
    const findUser = await this.userService.findOne({
      where: { username: loginDtoUser.username },
    });
    if (!findUser) {
      throw new HttpException('user not existed', HttpStatus.BAD_REQUEST);
    }
    const verified = await bcrypt.compare(
      loginDtoUser.password,
      findUser.password,
    );
    if (!verified) {
      throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);
    }
    const payload: object = {
      id: findUser.id,
      username: findUser.username,
    };
    const token = jwt.sign(payload, 'this_is_secret');
    return new responseLoginDTO({
      id: findUser.id,
      username: findUser.username,
      token: token,
    });
  }
}
