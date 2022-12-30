import { SummarizeService } from 'src/app/data/summarize.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
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
    window.api.receive("fromCredentials", (data: boolean) => {
      this.sumService.setHasCredentials(data);
    });

    // @ts-ignore
    window.api.receive("fromSummary", (data: string) => {
      if (data) {
        this.zone.run(() => {
          // const content = data.replace(/\\n/g, '<br />');
          const summary = JSON.parse(data);
          this.sumService.setSummary(summary);
          this.router.navigate(['/preview']);
        });
      }
    });

    // @ts-ignore
    window.api.receive("fromExport", (data: string) => {
      if (data) {
        this.zone.run(() => {
          this.router.navigate(['/success']);
        });
      }
    });

    // @ts-ignore
    window.api.receive("fromFilePath", (data: string) => {
      if (data) {
        this.zone.run(() => {
          this.sumService.setFilePath(data);
        });
      }
    });

  }
  
}
