import { Component } from '@angular/core';
import { PostInterface } from '@app/model/post.interface';
import { PostService } from '@app/services/post.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post-listing',
  templateUrl: './post-listing.component.html',
  styleUrls: ['./post-listing.component.scss'],
})
export class PostListingComponent {
  posts$: Observable<PostInterface[]>;

  constructor(private postService: PostService) {
    this.posts$ = this.postService.allPosts$;
  }

  trackPost(index: number, post: PostInterface) {
    return post.id;
  }
}
