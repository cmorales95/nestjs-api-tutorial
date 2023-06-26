import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../guard';
import { GetUser } from '../decorator';
import { User } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }
}
