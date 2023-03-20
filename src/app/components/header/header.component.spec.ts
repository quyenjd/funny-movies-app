import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FirebaseModule } from '@app/firebase/firebase.module';
import { UserService } from '@app/services/user.service';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  const TestCred = 'test@test.fm';

  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirebaseModule],
      declarations: [HeaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render Funny Movies in h1', () => {
    expect(
      fixture.debugElement.query(By.css('h1')).nativeElement.innerText
    ).toBe('Funny Movies');
  });

  it('should render login form', async () => {
    const emailInput = fixture.debugElement.query(By.css('input[type=email]'));
    const passwordInput = fixture.debugElement.query(
      By.css('input[type=password]')
    );
    const loginButton = fixture.debugElement.query(
      By.css('button[title="Login / Register"]')
    );

    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(loginButton).toBeTruthy();

    await userService.loginOrRegister(TestCred, TestCred);

    await fixture.whenStable();
  });

  it('should render email, share and logout button', () => {
    expect(fixture.debugElement.nativeElement.innerText).toContain(TestCred);
    expect(
      fixture.debugElement.query(By.css('button[title="Share a movie"]'))
    ).toBeTruthy();
    expect(
      fixture.debugElement.query(By.css('button[title="Logout"]'))
    ).toBeTruthy();
  });
});
