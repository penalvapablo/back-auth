import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtAuthGuard],
})
export class UsersModule {}
