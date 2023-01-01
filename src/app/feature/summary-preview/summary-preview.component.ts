import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, map, tap } from 'rxjs/operators';

import { SummarizeService } from 'src/app/data/summarize.service';

@Component({
  selector: 'app-summary-preview',
  templateUrl: './summary-preview.component.html',
  styleUrls: ['./summary-preview.component.css']
})
export class SummaryPreviewComponent implements OnInit {

  destroy$ = new Subject<boolean>();

  loading$ = this.sumService.loading$;

  filePath: string | undefined;
  text: string | undefined;
  
  fileName = new FormControl('', [Validators.required]);

  constructor(
    private sumService: SummarizeService,
  ) { }

  ngOnInit() {
    this.sumService.summary$.pipe(
      takeUntil(this.destroy$),
    ).subscribe(summary => {
      if (summary && summary.text) {
        this.text = summary.text;
        this.fileName.setValue(summary.fileName);
      }
    });
  }

  export() {
    const fileName = this.fileName.value?.trim();
    if (this.fileName.valid && fileName && fileName.length > 0 && this.text && this.text.length > 0) {
      // @ts-ignore
      window.api.send('toExport', { fileName, text: this.text });
    } else {
      this.fileName.markAsTouched();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
