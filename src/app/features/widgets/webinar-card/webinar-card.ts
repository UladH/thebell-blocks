import { DatePipe } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';

import { WebinarStatus } from '@services/webinar-status';
import { Webinar, WebinarState } from '@models/webinar.model';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [DatePipe, TranslatePipe],
  selector: 'app-webinar-card',
  templateUrl: './webinar-card.html',
  host: {
    class: 'flex flex-1 flex-col',
  },
})
export class WebinarCard {
  readonly WebinarState = WebinarState;

  private readonly webinarStatus = inject(WebinarStatus);

  readonly webinar = input.required<Webinar>();

  readonly state = computed(() => this.webinarStatus.resolve(this.webinar()));
}
