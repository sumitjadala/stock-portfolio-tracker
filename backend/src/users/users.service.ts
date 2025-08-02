/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common';
import { firestore } from 'firebase-admin';
import { FirebaseService } from '../firebase/firebase.service'; // Import service

@Injectable()
export class UsersService {
  private readonly db: firestore.Firestore; // Declare property

  constructor(private readonly firebaseService: FirebaseService) { // Inject
    this.db = this.firebaseService.getFirestore(); // Initialize in constructor
  }

  async findOne(userId: string) {
    const userDocRef = this.db.collection('users').doc(userId);
    const docSnap = await userDocRef.get();
    if (!docSnap.exists) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return docSnap.data();
  }
  // Other methods like 'create' would also use 'this.db'
}
