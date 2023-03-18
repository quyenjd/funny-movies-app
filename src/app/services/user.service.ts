import { Injectable } from '@angular/core';
import {
  Auth,
  AuthError,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import {
  collection,
  docData,
  Firestore,
  serverTimestamp,
  setDoc,
} from '@angular/fire/firestore';
import { doc } from '@firebase/firestore';
import { BehaviorSubject, map } from 'rxjs';
import { UserInterface } from '../model/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUser = new BehaviorSubject(null as UserInterface | null);

  get currentUser$() {
    return this.currentUser.asObservable();
  }

  constructor(private auth: Auth, private firestore: Firestore) {
    this.auth.onAuthStateChanged(user => {
      if (user) {
        this.getUser(user.uid).subscribe(this.currentUser);
      } else {
        this.currentUser.next(null);
      }
    });
  }

  getUser(id: string) {
    return docData(doc(collection(this.firestore, 'users'), id), {
      idField: 'uid',
    }).pipe(map(user => (user || null) as UserInterface | null));
  }

  async loginOrRegister(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      return 'Logged in successfully.';
    } catch (err) {
      const error = err as AuthError;

      if (error.code === 'auth/user-not-found') {
        // If login fails because the user does not exist, register it.
        try {
          const user = await createUserWithEmailAndPassword(
            this.auth,
            email,
            password
          );

          // Prepare user data after signing up.
          await setDoc(
            doc(collection(this.firestore, 'users'), user.user.uid),
            {
              email,
              createdAt: serverTimestamp(),
              posts: [],
              votes: [],
            }
          );

          return 'Registered successfully.';
        } catch (err) {
          return (err as AuthError).message;
        }
      }

      return error.message;
    }
  }

  async logout() {
    try {
      await signOut(this.auth);
      return 'Logged out successfully.';
    } catch (err) {
      return (err as AuthError).message;
    }
  }
}
