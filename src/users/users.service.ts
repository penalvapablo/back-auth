import { UpdateUserDto } from './dto/update-user.dto';
import { HttpException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/jwt/strategy';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async findMe(token: string): Promise<User | any> {
    //todo: here can add dto of user without password
    //todo: check why jwtService.decode is not working

    const base64Payload = token.split('.')[1];
    const payloadBuffer = Buffer.from(base64Payload, 'base64');

    const result: JwtPayload | any = JSON.parse(
      payloadBuffer.toString(),
    ) as JwtPayload;
    try {
      const user = await this.userModel.findOne({ _id: result.userId });
      const { password, ...userWithoutPassword }: User = user.toObject();
      return userWithoutPassword;
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  async update(
    token: string,
    updatedProps: UpdateUserDto,
  ): Promise<User | any> {
    //todo: here can add dto of user without password
    const { email, bio, phone, photo, name } = updatedProps; //to asegurate that we don't update password

    const base64Payload = token.split('.')[1];
    const payloadBuffer = Buffer.from(base64Payload, 'base64');

    const result: JwtPayload | any = JSON.parse(
      payloadBuffer.toString(),
    ) as JwtPayload;
    try {
      const updatedUser = await this.userModel.findOneAndUpdate(
        { _id: result.userId },
        { $set: { email, bio, phone, photo, name } },
        { new: true },
      );

      const { password, ...userWithoutPassword }: User = updatedUser.toObject();
      return userWithoutPassword;
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
}
