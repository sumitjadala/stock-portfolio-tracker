// src/transactions/transactions.controller.ts
import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user: {
    uid: string;
  };
}

@Controller('transactions')
@UseGuards(AuthGuard)
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto, @Req() request: AuthenticatedRequest) {
    const userId = request.user.uid;
    return this.transactionsService.create(createTransactionDto, userId);
  }
}
