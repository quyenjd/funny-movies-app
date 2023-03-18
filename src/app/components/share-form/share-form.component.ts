import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserInterface } from '@app/model/user.interface';
import { PostService } from '@app/services/post.service';
import { UserService } from '@app/services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-share-form',
  templateUrl: './share-form.component.html',
  styleUrls: ['./share-form.component.scss'],
})
export class ShareFormComponent {
  user$: Observable<UserInterface | null>;
  shareForm: FormGroup;

  constructor(
    private userService: UserService,
    private postService: PostService
  ) {
    this.user$ = this.userService.currentUser$;
    this.shareForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      youtubeUrl: new FormControl(null, [Validators.required]),
      description: new FormControl(null, []),
    });
  }

  async share(user: UserInterface) {
    if (this.shareForm.valid) {
      await this.postService.createPost(
        user.uid,
        this.shareForm.get('title')!.value || '',
        this.shareForm.get('youtubeUrl')!.value || '',
        this.shareForm.get('description')!.value || ''
      );
    }
  }
}
