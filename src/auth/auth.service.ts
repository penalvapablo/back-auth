import { Model } from 'mongoose';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../users/entities/user.entity';
import { RegisterLoginDto } from '../users/dto/registe-login.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(registerLoginDto: RegisterLoginDto) {
    const user = await this.userModel.find({
      email: registerLoginDto.email,
    });
    if (user.length !== 0) {
      throw new HttpException('User already exists', 409);
    }
    registerLoginDto.password = await bcrypt.hash(
      registerLoginDto.password,
      10,
    );
    const createdUser = new this.userModel(registerLoginDto);
    await createdUser.save();
    const payload = { userId: createdUser._id.toString() };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async login(registerLoginDto: RegisterLoginDto) {
    const [user] = await this.userModel.find({
      email: registerLoginDto.email,
    });

    if (!user) {
      throw new HttpException('Invalid credentials', 401);
    }
    const isValid = await bcrypt.compare(
      registerLoginDto.password,
      user.password,
    );
    if (!isValid) {
      throw new HttpException('Invalid credentials', 401);
    }
    const payload = { userId: user._id.toString() };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
