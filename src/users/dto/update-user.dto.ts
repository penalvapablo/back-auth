import { PartialType } from '@nestjs/mapped-types';
import { RegisterLoginDto } from './registe-login.dto';

export class UpdateUserDto extends PartialType(RegisterLoginDto) {}
