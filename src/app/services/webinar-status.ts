import { Service } from '@angular/core';

import { Webinar, WebinarState } from '@models/webinar.model';

@Service()
export class WebinarStatus {
  resolve(webinar: Webinar, now = new Date()): WebinarState {
    return webinar.date.getTime() < now.getTime() ? WebinarState.Past : WebinarState.Upcoming;
  }
}
