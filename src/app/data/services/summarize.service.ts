import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Summary } from '../models/summary';

@Injectable({
  providedIn: 'root'
})
export class SummarizeService {

  // CREDENTIALS

  private hasCredentialsSubject = new BehaviorSubject<boolean>(false);
  readonly hasCredentials$ = this.hasCredentialsSubject.asObservable();

  setHasCredentials(hasCredentials: boolean) {
    this.hasCredentialsSubject.next(hasCredentials);
  }

  private folderPathSubject = new BehaviorSubject<string>('');
  readonly folderPath$ = this.folderPathSubject.asObservable();

  setFolderPath(folderPath: string) {
    this.folderPathSubject.next(folderPath);
  }

  // SUMMARY

  private lastSearchSubject = new BehaviorSubject<string>('');
  readonly lastSearch$ = this.lastSearchSubject.asObservable();

  setLastSearch(lastSearch: string) {
    this.lastSearchSubject.next(lastSearch);
  }

  // PREVIEW - EXPORT

  private summarySubject = new BehaviorSubject<Summary | undefined>(undefined);
  readonly summary$ = this.summarySubject.asObservable();

  setSummary(summary?: Summary) {
    this.summarySubject.next(summary);
  }

  private loadingSubject = new BehaviorSubject<boolean>(false);
  readonly loading$ = this.loadingSubject.asObservable();

  setLoading(loading: boolean) {
    this.loadingSubject.next(loading);
  }

  private filePathSubject = new BehaviorSubject<string>('');
  readonly filePath$ = this.filePathSubject.asObservable();

  setFilePath(filePath: string) {
    this.filePathSubject.next(filePath);
  }

}