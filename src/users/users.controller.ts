import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    console.log('findAll');
    // return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async findOne(@Headers('authorization') token: string) {
    return await this.usersService.findMe(token);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/me/edit')
  update(
    @Headers('authorization') token: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(token, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.usersService.remove(+id);
  }
}
