import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ApiService } from '../../data/services/api.service';
import { SummarizeService } from 'src/app/data/services/summarize.service';

@Component({
  selector: 'app-browse-article',
  templateUrl: './browse-article.component.html',
  styleUrls: ['./browse-article.component.css']
})
export class BrowseArticleComponent implements OnInit {

  destroy$ = new Subject<boolean>();

  hasNoCredentials = false;

  urlControl = new FormControl('', [Validators.required, Validators.pattern('https?://.+')]);
  codeControl = new FormControl(true);

  constructor(
    private apiService: ApiService,
    private sumService: SummarizeService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.sumService.hasCredentials$.pipe(
      takeUntil(this.destroy$),
    ).subscribe(hasCredentials => {
      if (!hasCredentials) {
        this.hasNoCredentials = true;
        this.urlControl.disable();
        this.codeControl.disable();
      } else {
        this.hasNoCredentials = false;
        this.urlControl.enable();
        this.codeControl.enable();
      }
    });

    this.sumService.lastSearch$.pipe(
      takeUntil(this.destroy$),
    ).subscribe(lastSearch => {
      if (lastSearch) {
        this.urlControl.setValue(lastSearch);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  summarize() {
    const url = this.urlControl.value;
    const withCode = this.codeControl.value;

    if (this.urlControl.valid && url && url.length > 0 && withCode !== null) {
      // Reset the file path in Preview and start loading
      this.sumService.setFilePath('');
      this.sumService.setLoading(true);

      this.apiService.summarize({ url, withCode });

      // Save last search
      this.sumService.setLastSearch(url);

      // Navigate to the preview page
      this.router.navigate(['/preview']);
    } else {
      this.urlControl.markAsTouched();
    }
  }

}
