import { SummarizeService } from 'src/app/data/summarize.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { fadeAnimation } from './utils/fade-animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeAnimation],
})
export class AppComponent implements OnInit {
  title = 'Gepeto';

  constructor(
    private router: Router,
    private zone: NgZone,
    private sumService: SummarizeService,
  ) {}

  ngOnInit() {
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
      if (filePath) {
        this.zone.run(() => {
          this.sumService.setFilePath(filePath);
          this.router.navigate(['/success']);
          // Reset the preview observables
          this.sumService.setSummary();
        });
      } else {
        this.zone.run(() => {
          this.router.navigate(['/error']);
        });
      }
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

  getRouteAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'] || 'start';
  }
  
}
