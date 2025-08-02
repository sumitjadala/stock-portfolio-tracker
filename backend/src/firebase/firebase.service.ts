/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as serviceAccount from './serviceAccountKey.json';

@Injectable()
export class FirebaseService {
  private app: admin.app.App;

  constructor() {
    this.app = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    });
  }

  getAuth(): admin.auth.Auth {
    return this.app.auth();
  }

  getFirestore(): admin.firestore.Firestore {
    return this.app.firestore();
  }
}
