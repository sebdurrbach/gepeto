import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button'; 
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatInputModule} from '@angular/material/input'; 
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { AppComponent } from './app.component';
import { BrowseArticleComponent } from './feature/browse-article/browse-article.component';
import { SummaryPreviewComponent } from './feature/summary-preview/summary-preview.component';
import { CredentialsComponent } from './feature/credentials/credentials.component';
import { HomeComponent } from './feature/home/home.component';
import { SuccessComponent } from './feature/success/success.component';

@NgModule({
  declarations: [
    AppComponent,
    BrowseArticleComponent,
    SummaryPreviewComponent,
    CredentialsComponent,
    HomeComponent,
    SuccessComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
