import { Timestamp } from '@angular/fire/firestore';

export interface UserInterface {
  uid: string;
  email: string;
  createdAt: Timestamp;
  posts: string[];
  votes: { postId: string; type: 'upvote' | 'downvote' }[];
}
