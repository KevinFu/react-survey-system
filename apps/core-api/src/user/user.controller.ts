import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Redirect,
} from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('register')
  async register(@Body() userDto: UserDto) {
    try {
      return await this.userService.create(userDto);
    } catch (err) {
      throw new HttpException(err as string, HttpStatus.BAD_REQUEST);
    }
  }

  @Public()
  @Post('login')
  @Redirect('/api/auth/login', 307)
  login() {
    return;
  }

  @Get('info')
  @Redirect('/api/auth/profile', 302)
  info() {
    return;
  }
}
