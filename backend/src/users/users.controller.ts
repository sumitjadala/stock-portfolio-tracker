// src/users/users.controller.ts
import { Controller, Get, UseGuards, Req, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard'; // Adjust path if needed
import { Request } from 'express';
import { CreateUserDto } from './dto/create-user.dto';

interface AuthenticatedRequest extends Request {
  user: {
    uid: string;
  };
}

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  getMe(@Req() request: AuthenticatedRequest) {
    const userId = request.user.uid;
    return this.usersService.findOne(userId);
  }

  @Post()
  createUser(@Req() request: AuthenticatedRequest, @Body() createUserDto: CreateUserDto) {
    const userId = request.user.uid;
    return this.usersService.create(userId, createUserDto);
  }
}
