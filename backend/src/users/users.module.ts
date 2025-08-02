// src/users/users.module.ts

import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { FirebaseModule } from '../firebase/firebase.module'; // Import FirebaseModule

@Module({
  // Import any modules whose services you need to use here.
  // We need FirebaseModule because AuthGuard depends on FirebaseService.
  imports: [FirebaseModule],

  // Register the controller for this module.
  controllers: [UsersController],
  
  // Register the service for this module, making it available for dependency injection.
  providers: [UsersService],
})
export class UsersModule {}
