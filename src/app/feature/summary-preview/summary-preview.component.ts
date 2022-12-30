import { Component, OnInit } from '@angular/core';
import { NgZone } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { SummarizeService } from 'src/app/data/summarize.service';

@Component({
  selector: 'app-summary-preview',
  templateUrl: './summary-preview.component.html',
  styleUrls: ['./summary-preview.component.css']
})
export class SummaryPreviewComponent implements OnInit {

  destroy$ = new Subject<boolean>();
  summary: string = '';

  constructor(
    private sumService: SummarizeService,
    private zone: NgZone,
  ) { }

  ngOnInit(): void {
    this.sumService.summary$.pipe(
      takeUntil(this.destroy$),
    ).subscribe(summary => {
      if (summary) {
        this.summary = summary;
      }
    });
  }

  export() {
    // @ts-ignore
    window.api.send('toExport', { summary: this.summary });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
