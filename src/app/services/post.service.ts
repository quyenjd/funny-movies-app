import { Injectable } from '@angular/core';
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  Firestore,
  serverTimestamp,
  updateDoc,
} from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import { PostInterface } from '../model/post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  readonly allPosts$: Observable<PostInterface[]>;

  constructor(private firestore: Firestore) {
    // Sort all posts by their creation time (latest first).
    this.allPosts$ = collectionData(collection(this.firestore, 'posts'), {
      idField: 'id',
    }).pipe(
      map(posts =>
        posts
          .map(post => post as PostInterface)
          .sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis())
      )
    );
  }

  getPost(id: string) {
    return this.allPosts$.pipe(
      map(
        posts =>
          (posts.filter(post => post.id === id)[0] ||
            null) as PostInterface | null
      )
    );
  }

  async createPost(
    userId: string,
    title: string,
    youtubeUrl: string,
    description: string
  ) {
    // Add post data.
    const ref = await addDoc(collection(this.firestore, 'posts'), {
      title,
      youtubeUrl,
      description,
      createdAt: serverTimestamp(),
      author: userId,
      votes: [],
    });

    // Add post id to user data.
    await updateDoc(doc(collection(this.firestore, 'users'), userId), {
      posts: arrayUnion(ref.id),
    });

    return ref.id;
  }

  async removePost(post: PostInterface) {
    // Remote post data.
    await deleteDoc(doc(collection(this.firestore, 'posts'), post.id));

    // Remove post id from user data.
    await updateDoc(doc(collection(this.firestore, 'users'), post.author), {
      posts: arrayRemove(post.id),
    });
  }

  async addVote(postId: string, userId: string, type: 'upvote' | 'downvote') {
    // Remove the counter vote first if exists.
    // This is to support switching between votes quickly.
    await this.removeVote(
      postId,
      userId,
      type === 'upvote' ? 'downvote' : 'upvote'
    );

    // Add the vote to post data.
    await updateDoc(doc(collection(this.firestore, 'posts'), postId), {
      votes: arrayUnion({ userId, type }),
    });

    // Add the vote to user data.
    await updateDoc(doc(collection(this.firestore, 'users'), userId), {
      votes: arrayUnion({ postId, type }),
    });
  }

  async removeVote(
    postId: string,
    userId: string,
    type: 'upvote' | 'downvote'
  ) {
    // Remove the vote from post data.
    await updateDoc(doc(collection(this.firestore, 'posts'), postId), {
      votes: arrayRemove({ userId, type }),
    });

    // Remove the vote from user data.
    await updateDoc(doc(collection(this.firestore, 'users'), userId), {
      votes: arrayRemove({ postId, type }),
    });
  }
}
