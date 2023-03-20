import { TestBed } from '@angular/core/testing';
import { FirebaseModule } from '@app/firebase/firebase.module';
import { lastValueFrom } from 'rxjs';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FirebaseModule],
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login/register new user', async () => {
    expect(['Logged in successfully.', 'Registered successfully.']).toContain(
      await service.loginOrRegister('test@test.fm', 'test@test.fm')
    );
    expect(await lastValueFrom(service.currentUser$)).toBeTruthy();
  });

  it('should logout', async () => {
    expect(await service.logout()).toBe('Logged out successfully.');
    expect(await lastValueFrom(service.currentUser$)).toBeFalsy();
  });
});
