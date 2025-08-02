import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionsModule } from './transactions/transactions.module';
import { FirebaseModule } from './firebase/firebase.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TransactionsModule, FirebaseModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
