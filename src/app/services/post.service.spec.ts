import { TestBed } from '@angular/core/testing';
import { FirebaseModule } from '@app/firebase/firebase.module';
import { lastValueFrom } from 'rxjs';
import { PostService } from './post.service';

describe('PostService', () => {
  let service: PostService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FirebaseModule],
    });
    service = TestBed.inject(PostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to add/remove posts and add/remove votes', async () => {
    const postId = await service.createPost(
      'userId',
      'title',
      'youtubeUrl',
      'description'
    );
    const post$ = service.getPost(postId);

    const post = await lastValueFrom(post$);
    expect(post).toEqual(
      jasmine.objectContaining({
        title: 'title',
        youtubeUrl: 'youtubeUrl',
        description: 'description',
        author: 'userId',
        votes: [],
      })
    );

    await service.addVote(postId, 'userId', 'upvote');
    expect(await lastValueFrom(post$)).toEqual(
      jasmine.objectContaining({
        votes: [{ userId: 'userId', type: 'upvote' }],
      })
    );

    await service.addVote(postId, 'userId', 'downvote');
    expect(await lastValueFrom(post$)).toEqual(
      jasmine.objectContaining({
        votes: [{ userId: 'userId', type: 'downvote' }],
      })
    );

    await service.removeVote(postId, 'userId', 'downvote');
    expect(await lastValueFrom(post$)).toEqual(
      jasmine.objectContaining({
        votes: [],
      })
    );

    await service.removePost((await lastValueFrom(post$))!);
    expect(await lastValueFrom(post$)).toBeFalsy();
  });
});
