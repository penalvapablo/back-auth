import {
  Controller,
  Get,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Headers,
  HttpException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @UseGuards(JwtAuthGuard)
  // @Get()
  // findAll() {
  //   console.log('findAll');
  //   // return this.usersService.findAll();
  // }
  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async findOne(@Headers('authorization') token: string): Promise<any> {
    try {
      return await this.usersService.findMe(token);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  @UseGuards(JwtAuthGuard)
  @Put('/me')
  async update(
    @Headers('authorization') token: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      return await this.usersService.updateMe(token, updateUserDto);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   // return this.usersService.remove(+id);
  // }
}
