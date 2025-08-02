/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// src/transactions/transactions.service.ts
import { Injectable } from '@nestjs/common';
import { firestore } from 'firebase-admin';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { FirebaseService } from '../firebase/firebase.service'; // Correct import path

@Injectable()
export class TransactionsService {
  private readonly db: firestore.Firestore; // Declare property

  constructor(private readonly firebaseService: FirebaseService) { // Inject
    this.db = this.firebaseService.getFirestore(); // Initialize in constructor
  }

  async create(createTransactionDto: CreateTransactionDto, userId: string) {
    const transactionData = {
      ...createTransactionDto,
      createdAt: firestore.FieldValue.serverTimestamp(),
    };
    const docRef = await this.db.collection('users').doc(userId).collection('transactions').add(transactionData);
    return { id: docRef.id, ...transactionData };
  }
}
