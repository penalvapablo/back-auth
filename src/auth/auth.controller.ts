import { Controller, Post, Body, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterLoginDto } from '../users/dto/registe-login.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerLoginDto: RegisterLoginDto) {
    try {
      return await this.authService.register(registerLoginDto);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  @Post('login')
  async login(@Body() registerLoginDto: RegisterLoginDto) {
    try {
      return await this.authService.login(registerLoginDto);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
