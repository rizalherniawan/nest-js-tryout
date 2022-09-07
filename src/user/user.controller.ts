import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BaseResponseDto } from 'src/common/response/response';
import { loginDTO, responseLoginDTO } from './dto/login.dto';
import { registerDTOUser, responseRegisterDTOUser } from './dto/resgiter.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('/register')
  @UsePipes(ValidationPipe)
  async register(
    @Body() registerdto: registerDTOUser,
  ): Promise<BaseResponseDto<responseRegisterDTOUser>> {
    const regist = await this.userService.registUser(registerdto);
    if (!regist) {
      throw new HttpException(
        'Registed failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return new BaseResponseDto({
      success: true,
      data: regist,
      message: 'register success',
    });
  }

  @Post('/login')
  @UsePipes(ValidationPipe)
  async login(
    @Body() logindto: loginDTO,
  ): Promise<BaseResponseDto<responseLoginDTO>> {
    const login = await this.userService.loginUser(logindto);
    if (!login) {
      throw new HttpException('Login failed', HttpStatus.NOT_ACCEPTABLE);
    }
    return new BaseResponseDto({
      success: true,
      data: login,
      message: `${login.username} successfully loggedin`,
    });
  }
}
