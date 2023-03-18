import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInterface } from '@app/model/user.interface';
import { UserService } from '@app/services/user.service';
import {
  faHouseChimney,
  faRightFromBracket,
  faRightToBracket,
  faShare,
} from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  user$: Observable<UserInterface | null>;
  faHouseChimney = faHouseChimney;
  faRightToBracket = faRightToBracket;
  faRightFromBracket = faRightFromBracket;
  faShare = faShare;
  loginForm: FormGroup;

  constructor(private userService: UserService, private router: Router) {
    this.user$ = this.userService.currentUser$;
    this.loginForm = new FormGroup({
      email: new FormControl('hello@hello', [Validators.required]),
      password: new FormControl('hello@hello', [Validators.required]),
    });
  }

  async login() {
    if (this.loginForm.valid) {
      alert(
        await this.userService.loginOrRegister(
          this.loginForm.get('email')!.value,
          this.loginForm.get('password')!.value
        )
      );
    }
  }

  async logout() {
    if (confirm('Are you sure to logout?')) {
      alert(await this.userService.logout());
    }
  }
}
