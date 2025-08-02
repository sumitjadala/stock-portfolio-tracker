import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { FirebaseModule } from '../firebase/firebase.module'; // Import FirebaseModule

@Module({
  imports: [FirebaseModule], // Add FirebaseModule here
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
