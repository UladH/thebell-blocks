import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Modal } from './modal';
import { provideTestTranslations } from '@testing/translate-testing';

describe('Modal', () => {
  let component: Modal;
  let fixture: ComponentFixture<Modal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Modal],
      providers: [provideTestTranslations()],
    }).compileComponents();

    fixture = TestBed.createComponent(Modal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('emits closed on backdrop click', () => {
    let closed = false;
    component.closed.subscribe(() => (closed = true));
    const backdrop = fixture.nativeElement.querySelector('[tabindex="-1"]');
    backdrop.click();
    expect(closed).toBe(true);
  });

  it('does not emit closed when clicking inside the card', () => {
    let closed = false;
    component.closed.subscribe(() => (closed = true));
    const card = fixture.nativeElement.querySelector('[tabindex="-1"] > div');
    card.click();
    expect(closed).toBe(false);
  });

  it('emits back on back button click', () => {
    fixture.componentRef.setInput('showBack', true);
    fixture.detectChanges();

    let wentBack = false;
    component.back.subscribe(() => (wentBack = true));
    const backButton = fixture.nativeElement.querySelector('button');
    backButton.click();
    expect(wentBack).toBe(true);
  });

  it('focuses the backdrop so escape works without a prior tab', () => {
    const backdrop = fixture.nativeElement.querySelector('[tabindex="-1"]');
    expect(document.activeElement).toBe(backdrop);
  });

  it('emits closed on escape', () => {
    let closed = false;
    component.closed.subscribe(() => (closed = true));
    const backdrop = fixture.nativeElement.querySelector('[tabindex="-1"]');
    backdrop.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    expect(closed).toBe(true);
  });
});
