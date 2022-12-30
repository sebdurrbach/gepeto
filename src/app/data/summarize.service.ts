import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SummarizeService {

  private hasCredentialsSubject = new BehaviorSubject<boolean>(false);
  hasCredentials$ = this.hasCredentialsSubject.asObservable();

  setHasCredentials(hasCredentials: boolean) {
    this.hasCredentialsSubject.next(hasCredentials);
  }

  private filePathSubject = new BehaviorSubject<string>('');
  filePath$ = this.filePathSubject.asObservable();

  setFilePath(filePath: string) {
    this.filePathSubject.next(filePath);
  }

  private lastSearchSubject = new BehaviorSubject<string>('');
  lastSearch$ = this.lastSearchSubject.asObservable();

  setLastSearch(lastSearch: string) {
    this.lastSearchSubject.next(lastSearch);
  }

  private summarySubject = new BehaviorSubject<string>('');
  summary$ = this.summarySubject.asObservable();

  setSummary(summary: string) {
    this.summarySubject.next(summary);
  }

}