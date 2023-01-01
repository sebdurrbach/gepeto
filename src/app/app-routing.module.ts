import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './feature/home/home.component';
import { BrowseArticleComponent } from './feature/browse-article/browse-article.component';
import { SummaryPreviewComponent } from './feature/summary-preview/summary-preview.component';
import { CredentialsComponent } from './feature/credentials/credentials.component';
import { SuccessComponent } from './feature/success/success.component';
import { ErrorComponent } from './feature/error/error.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: HomeComponent,
    data: { animation: 'home' }
  },
  {
    path: 'credentials',
    component: CredentialsComponent,
    data: { animation: 'credentials' }
  },
  {
    path: 'summarize',
    component: BrowseArticleComponent,
    data: { animation: 'summarize' }
  },
  {
    path: 'preview',
    component: SummaryPreviewComponent,
    data: { animation: 'preview' }
  },
  {
    path: 'success',
    component: SuccessComponent,
    data: { animation: 'success' }
  },
  {
    path: 'error',
    component: ErrorComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }