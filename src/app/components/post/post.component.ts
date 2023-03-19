import { Component, Input } from '@angular/core';
import { PostInterface } from '@app/model/post.interface';
import { UserInterface } from '@app/model/user.interface';
import { PostService } from '@app/services/post.service';
import { UserService } from '@app/services/user.service';
import {
  faThumbsDown,
  faThumbsUp,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { lastValueFrom, Observable, timer } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  user$: Observable<UserInterface | null>;
  author$?: Observable<UserInterface | null>;
  private _post?: PostInterface;
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  faTrash = faTrash;
  upvoteClicked = false;
  downvoteClicked = false;

  get post() {
    return this._post;
  }

  @Input() set post(value: PostInterface | undefined) {
    if (value) {
      this._post = value;
      this.author$ = this.userService.getUser(value.author);
    }
  }

  constructor(
    private userService: UserService,
    private postService: PostService
  ) {
    this.user$ = this.userService.currentUser$;
  }

  countVotes(
    votes: PostInterface['votes'],
    type: PostInterface['votes'][number]['type']
  ) {
    return votes.filter(vote => vote.type === type).length;
  }

  getMyVote(
    currentUser: UserInterface,
    votes: PostInterface['votes']
  ): PostInterface['votes'][number]['type'] | null {
    return (
      votes.filter(vote => vote.userId === currentUser.uid)[0]?.type || null
    );
  }

  async vote(
    type: 'upvote' | 'downvote',
    user: UserInterface,
    post: PostInterface
  ) {
    let afterAnimationDone: Promise<void>;

    if (type === 'upvote') {
      this.upvoteClicked = true;

      afterAnimationDone = lastValueFrom(timer(1000)).then(() => {
        this.upvoteClicked = false;
      });
    } else {
      this.downvoteClicked = true;
      afterAnimationDone = lastValueFrom(timer(500)).then(() => {
        this.downvoteClicked = false;
      });
    }

    await afterAnimationDone;
    await this.postService.addVote(post.id, user.uid, type);
  }

  async unvote(
    type: 'upvote' | 'downvote',
    user: UserInterface,
    post: PostInterface
  ) {
    await this.postService.removeVote(post.id, user.uid, type);
  }

  async removePost(post: PostInterface) {
    if (confirm('Are you sure to remove this post?')) {
      try {
        await this.postService.removePost(post);
        alert('Your post has been removed successfully.');
      } catch (err) {
        alert((err as Error).message);
      }
    }
  }
}
