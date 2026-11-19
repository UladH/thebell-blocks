import { of } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebinarsWidget } from './webinars-widget';
import { WebinarsRepository } from '@services/webinars.repository';
import { provideTestTranslations } from '@testing/translate-testing';

describe('WebinarsWidget', () => {
  let component: WebinarsWidget;
  let fixture: ComponentFixture<WebinarsWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebinarsWidget],
      providers: [provideTestTranslations()],
    }).compileComponents();

    fixture = TestBed.createComponent(WebinarsWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('links the cta to the real donation page', () => {
    const cta: HTMLAnchorElement = fixture.nativeElement.querySelector('a.btn-brand');
    expect(cta.href).toBe(component.donateUrl);
    expect(cta.target).toBe('_blank');
  });

  it('renders no image for a webinar without a cover', async () => {
    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [WebinarsWidget],
      providers: [
        provideTestTranslations(),
        {
          provide: WebinarsRepository,
          useValue: {
            getAll: () =>
              of([
                {
                  id: 'no-cover',
                  date: new Date(2026, 0, 1),
                  title: 'Без фото',
                  speaker: 'Спикер',
                },
              ]),
          },
        },
      ],
    }).compileComponents();

    const noCoverFixture = TestBed.createComponent(WebinarsWidget);
    await noCoverFixture.whenStable();

    expect(noCoverFixture.nativeElement.querySelector('img')).toBeNull();
  });
});
