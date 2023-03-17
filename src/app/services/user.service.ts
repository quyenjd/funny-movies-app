import { Injectable } from '@angular/core';
import {
  Auth,
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

  async login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  async logout() {
    return signOut(this.auth);
  }

  async signup(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password).then(
      async user => {
        // Prepare user data after signing up.
        await setDoc(doc(collection(this.firestore, 'users'), user.user.uid), {
          email,
          createdAt: serverTimestamp(),
          posts: [],
          votes: [],
        });

        return user;
      }
    );
  }
}
