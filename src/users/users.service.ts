import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update-user.dto';

//TODO: add type userWithPassword
type userWithoutPassword = {
  _id: string;
  email: string;
  bio?: string;
  photo?: string;
  phone?: string;
  __v?: number;
};
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async findMe(token: string): Promise<any> {
    token = token.split(' ')[1];
    const result: any = this.jwtService.decode(token);

    const user = await this.userModel.findOne({
      _id: result.userId,
    });
    const { password, ...userWithoutPassword } = user.toObject();
    return userWithoutPassword;
  }

  async updateMe(token: string, updateUserDto: UpdateUserDto): Promise<any> {
    token = token.split(' ')[1];
    const result: any = this.jwtService.decode(token);

    const user = await this.userModel.findByIdAndUpdate(
      result.userId,
      updateUserDto,
    );

    const { password, ...userWithoutPassword } = user.toObject();
    return userWithoutPassword;
  }
}
