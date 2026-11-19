import { Observable, of } from 'rxjs';
import { Service } from '@angular/core';

import { WEBINARS } from '@data/webinar';
import { Webinar } from '@models/webinar.model';

@Service()
export class WebinarsRepository {
  getAll(): Observable<Webinar[]> {
    return of(WEBINARS);
  }
}
