import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WEBINARS } from '@data/webinar';
import { WebinarCard } from './webinar-card';
import { WebinarState } from '@models/webinar.model';
import { provideTestTranslations } from '@testing/translate-testing';

describe('WebinarCard', () => {
  let component: WebinarCard;
  let fixture: ComponentFixture<WebinarCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebinarCard],
      providers: [provideTestTranslations()],
    }).compileComponents();

    fixture = TestBed.createComponent(WebinarCard);
    component = fixture.componentInstance;
  });

  it('should create', async () => {
    fixture.componentRef.setInput('webinar', WEBINARS[0]);
    await fixture.whenStable();
    expect(component).toBeTruthy();
  });

  it('resolves a past webinar as Past', async () => {
    fixture.componentRef.setInput('webinar', {
      ...WEBINARS[0],
      date: new Date(2000, 0, 1),
    });
    await fixture.whenStable();
    expect(component.state()).toBe(WebinarState.Past);
  });

  it('resolves a future webinar as Upcoming', async () => {
    fixture.componentRef.setInput('webinar', {
      ...WEBINARS[0],
      date: new Date(2999, 0, 1),
    });
    await fixture.whenStable();
    expect(component.state()).toBe(WebinarState.Upcoming);
  });
});
