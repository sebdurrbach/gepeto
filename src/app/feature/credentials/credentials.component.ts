import { fadeAnimation } from './../../utils/fade-animation';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { SummarizeService } from '../../data/summarize.service';
import { of, Subject } from 'rxjs';
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

  apikey = new FormControl('', [Validators.required]);
  defaultLocation = new FormControl('', [Validators.required]);

  constructor(
    private sumService: SummarizeService,
  ) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.sumService.folderPath$.pipe(
      takeUntil(this.destroy$),
    ).subscribe(folderPath => {
      if (folderPath) {
        this.defaultLocation.setValue(folderPath);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  saveKey() {
    if (this.apikey.valid && this.apikey.value && this.apikey.value.length > 0) {
      // @ts-ignore
      window.api.send('toCredentials', this.apikey.value);
    } else {
      this.apikey.markAsTouched();
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
        this.defaultLocation.setValue(realPath);
      } 
    } 
  }

  saveLocation() {
    if (this.defaultLocation.valid && this.defaultLocation.value && this.defaultLocation.value.length > 0) {
      // @ts-ignore
      window.api.send('toFolderPath', this.defaultLocation.value);
    } else {
      this.defaultLocation.markAsTouched();
    }
  }

}
