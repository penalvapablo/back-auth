import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class UpdateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsString()
  bio: string;
  @IsString()
  name: string;
  @IsString()
  photo: string;
  @IsString()
  phone: string;
}
