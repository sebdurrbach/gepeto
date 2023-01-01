import { takeUntil } from 'rxjs/operators';
import { SummarizeService } from './../../data/summarize.service';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  destroy$ = new Subject<boolean>();

  filePath: string | undefined;

  constructor(
    private sumService: SummarizeService,
  ) { }

  ngOnInit(): void {
    this.sumService.filePath$.pipe(
      takeUntil(this.destroy$),
    ).subscribe(filePath => {
      if (filePath) {
        this.filePath = filePath;
      }
    });
  }

  openFile() {
    if (this.filePath) {
      // @ts-ignore
      window.api.send('toOpenFile', this.filePath);
    }
  }

}
