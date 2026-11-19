import { TestBed } from '@angular/core/testing';

import { WebinarStatus } from './webinar-status';
import { WebinarState } from '@models/webinar.model';

describe('WebinarStatus', () => {
  let service: WebinarStatus;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebinarStatus);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('resolves a webinar in the past as Past', () => {
    const webinar = { id: 'x', date: new Date(2026, 0, 1), title: '', speaker: '' };
    expect(service.resolve(webinar, new Date(2026, 5, 1))).toBe(WebinarState.Past);
  });

  it('resolves a webinar in the future as Upcoming', () => {
    const webinar = { id: 'x', date: new Date(2026, 11, 1), title: '', speaker: '' };
    expect(service.resolve(webinar, new Date(2026, 5, 1))).toBe(WebinarState.Upcoming);
  });
});
