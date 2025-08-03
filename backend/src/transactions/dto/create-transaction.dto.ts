/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsNumber, IsDateString, IsIn } from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  stockSymbol!: string;

  @IsIn(['buy', 'sell'])
  type!: 'buy' | 'sell';

  @IsNumber()
  shares!: number;

  @IsNumber()
  pricePerShare!: number;

  @IsDateString()
  date!: string;

  @IsNumber()
  transactionAmount!: number;
}
