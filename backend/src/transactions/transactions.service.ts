/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// src/transactions/transactions.service.ts
import { Injectable } from '@nestjs/common';
import { firestore } from 'firebase-admin';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class TransactionsService {
  private readonly db: firestore.Firestore;

  constructor(private readonly firebaseService: FirebaseService) {
    this.db = this.firebaseService.getFirestore();
  }

  async create(createTransactionDto: CreateTransactionDto, userId: string) {
    const transactionData = {
      ...createTransactionDto,
      createdAt: firestore.FieldValue.serverTimestamp(),
    };
    const docRef = await this.db.collection('users').doc(userId).collection('transactions').add(transactionData);
    return { id: docRef.id, ...transactionData };
  }

  async findAllForUser(userId: string) {
    const transactionsRef = this.db.collection('users').doc(userId).collection('transactions');
    const snapshot = await transactionsRef.orderBy('date', 'desc').get();
    if (snapshot.empty) {
      return [];
    }
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }
}
