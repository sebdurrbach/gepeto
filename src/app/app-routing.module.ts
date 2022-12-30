import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './feature/home/home.component';
import { BrowseArticleComponent } from './feature/browse-article/browse-article.component';
import { SummaryPreviewComponent } from './feature/summary-preview/summary-preview.component';
import { CredentialsComponent } from './feature/credentials/credentials.component';
import { SuccessComponent } from './feature/success/success.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'credentials',
    component: CredentialsComponent,
  },
  {
    path: 'summarize',
    component: BrowseArticleComponent,
  },
  {
    path: 'preview',
    component: SummaryPreviewComponent,
  },
  {
    path: 'success',
    component: SuccessComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }