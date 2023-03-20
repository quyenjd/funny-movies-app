import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Timestamp } from '@angular/fire/firestore';
import { By } from '@angular/platform-browser';
import { PostComponent } from './post.component';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render post', async () => {
    component.post = {
      id: 'test',
      title: 'Marques Brownlee Reviews EVERY iPhone Ever! (as of 2021)',
      youtubeUrl: 'https://www.youtube.com/watch?v=8FpPSMIB4uA',
      description:
        "There have been 33 iPhones in 14 years. Let's take a look at every single one of them!",
      createdAt: Timestamp.fromDate(new Date()),
      author: '', // a non-existing user
      votes: [
        { userId: 'user1', type: 'upvote' },
        { userId: 'user2', type: 'downvote' },
      ],
    };

    await fixture.whenStable();
  });

  it('should render title in h2', () => {
    expect(
      fixture.debugElement.query(By.css('h2')).nativeElement.innerText
    ).toBe(component.post?.title);
  });

  it('should count votes properly', () => {
    expect(
      fixture.debugElement.query(By.css('.vote-button[title=Upvote]'))
        .nativeElement.innerText
    ).toContain(1);
    expect(
      fixture.debugElement.query(By.css('.vote-button[title=Downvote]'))
        .nativeElement.innerText
    ).toContain(1);
  });
});
