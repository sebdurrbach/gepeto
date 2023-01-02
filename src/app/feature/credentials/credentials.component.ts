import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { ApiService } from '../../data/services/api.service';
import { SummarizeService } from '../../data/services/summarize.service';
import { fadeAnimation } from './../../utils/fade-animation';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-credentials',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.css'],
  animations: [fadeAnimation],
})
export class CredentialsComponent implements OnInit, OnDestroy {

  destroy$ = new Subject<boolean>();

  hasCredentials$ = this.sumService.hasCredentials$;

  keyControl = new FormControl('', [Validators.required]);
  folderPathControl = new FormControl('', [Validators.required]);

  constructor(
    private apiService: ApiService,
    private sumService: SummarizeService,
  ) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.sumService.folderPath$.pipe(
      takeUntil(this.destroy$),
    ).subscribe(folderPath => {
      if (folderPath) {
        this.folderPathControl.setValue(folderPath);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  saveKey() {
    if (this.keyControl.valid && this.keyControl.value && this.keyControl.value.length > 0) {
      this.apiService.saveKey(this.keyControl.value);
    } else {
      this.keyControl.markAsTouched();
    }
  }

  changeKey() {
    this.sumService.setHasCredentials(false);
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.path && file.name) {
        const realPath = file.path.replace(file.name, '').slice(0, -1);
        this.folderPathControl.setValue(realPath);
      } 
    } 
  }

  saveFolderPath() {
    if (this.folderPathControl.valid && this.folderPathControl.value && this.folderPathControl.value.length > 0) {
      this.apiService.saveFolderPath(this.folderPathControl.value);
    } else {
      this.folderPathControl.markAsTouched();
    }
  }

}
