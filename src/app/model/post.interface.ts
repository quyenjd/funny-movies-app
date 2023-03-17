import { Timestamp } from '@angular/fire/firestore';

export interface PostInterface {
  id: string;
  title: string;
  youtubeUrl: string;
  description: string;
  createdAt: Timestamp;
  author: string;
  votes: { userId: string; type: 'upvote' | 'downvote' }[];
}
