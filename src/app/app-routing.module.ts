import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListingComponent } from './components/post-listing/post-listing.component';
import { ShareFormComponent } from './components/share-form/share-form.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: PostListingComponent,
  },
  {
    path: 'share',
    component: ShareFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
