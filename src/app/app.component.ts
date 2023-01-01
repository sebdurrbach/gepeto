import { SummarizeService } from 'src/app/data/summarize.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { ChildrenOutletContexts, OutletContext, Router, RouterOutlet } from '@angular/router';
import { fadeAnimation } from './utils/fade-animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeAnimation],
})
export class AppComponent implements OnInit {
  title = 'gepeto';

  constructor(
    private router: Router,
    private sumService: SummarizeService,
    private zone: NgZone,
  ) {}

  ngOnInit() {
      // @ts-ignore
    window.api?.receive("fromCredentials", (data: boolean) => {
      this.zone.run(() => {
        this.sumService.setHasCredentials(data);
      });
    });

    // @ts-ignore
    window.api?.receive("fromSummary", (data: Summary) => {
      if (data) {
        this.zone.run(() => {
          data.text = JSON.parse(data.text);
          this.sumService.setSummary(data);
          this.sumService.setLoading(false);
        });
      }
    });

    // @ts-ignore
    window.api?.receive("fromExport", (data: string) => {
      if (data) {
        this.zone.run(() => {
          this.sumService.setFilePath(data);
          this.router.navigate(['/success']);
        });
      } else {
        this.zone.run(() => {
          this.router.navigate(['/error']);
        });
      }
    });

    // @ts-ignore
    window.api?.receive("fromFolderPath", (data: string) => {
      if (data) {
        this.zone.run(() => {
          this.sumService.setFolderPath(data);
        });
      }
    });

    // @ts-ignore
    window.api?.receive("fromPendingSummary", (data: string) => {
      if (data) {
        this.zone.run(() => {
          this.sumService.setLoading(true);
          this.router.navigate(['/preview']);
        });
      }
    });

  }

  getRouteAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'] || 'start';
  }
  
}
