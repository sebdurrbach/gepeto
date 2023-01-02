import { SummaryRequest } from '../models/summary-request';
import { Summary } from '../models/summary';
import { NgZone, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { SummarizeService } from 'src/app/data/services/summarize.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private zone: NgZone,
    private router: Router,
    private sumService: SummarizeService,
  ) { }

  /**
   * Initialize all the listeners for the API
   */
  init() {
    // @ts-ignore
    window.api?.receive("fromCredentials", (hasCredentials: boolean) => {
      this.zone.run(() => {
        this.sumService.setHasCredentials(hasCredentials);
      });
    });

    // @ts-ignore
    window.api?.receive("fromSummary", (summary: Summary) => {
      if (summary) {
        this.zone.run(() => {
          summary.text = JSON.parse(summary.text);
          this.sumService.setSummary(summary);
          this.sumService.setLoading(false);
        });
      }
    });

    // @ts-ignore
    window.api?.receive("fromExport", (filePath: string) => {
      this.zone.run(() => {
        if (filePath) {
          this.sumService.setFilePath(filePath);
          this.router.navigate(['/success']);
          // Reset the preview observables
          this.sumService.setSummary();
        } else {
          this.router.navigate(['/error']);
        }
      });
    });

    // @ts-ignore
    window.api?.receive("fromFolderPath", (folderPath: string) => {
      if (folderPath) {
        this.zone.run(() => {
          this.sumService.setFolderPath(folderPath);
        });
      }
    });
  }

  saveKey(key: string) {
    // @ts-ignore
    window.api.send('toCredentials', key);
  }

  saveFolderPath(folderPath: string) {
    // @ts-ignore
    window.api.send('toFolderPath', folderPath);
  }

  summarize(summaryRequest: SummaryRequest) {
    // @ts-ignore
    window.api.send('toSummary', summaryRequest);
  }

  export(summary: Summary) {
    // @ts-ignore
    window.api.send('toExport', summary);
  }

  openFile(filePath: string) {
    // @ts-ignore
    window.api.send('toOpenFile', filePath);
  };
}