import { Component, inject } from '@angular/core';

import { WebinarsStore } from './webinars.store';
import { GridCell } from '@components/grid-cell/grid-cell';
import { GridLine } from '@components/grid-line/grid-line';
import { TranslatePipe } from '@ngx-translate/core';
import { WebinarCard } from '../webinar-card/webinar-card';

@Component({
  imports: [GridLine, GridCell, WebinarCard, TranslatePipe],
  selector: 'app-webinars-widget',
  providers: [WebinarsStore],
  templateUrl: './webinars-widget.html',
  host: {
    class: 'block min-w-0',
  },
})
export class WebinarsWidget {
  readonly donateUrl = 'https://donate.osetinskaya.io/';

  private readonly store = inject(WebinarsStore);

  readonly webinars = this.store.webinars;
}
