import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PRODUCTS } from '@data/product';
import { SuccessModal } from './success-modal';
import { provideTestTranslations } from '@testing/translate-testing';

describe('SuccessModal', () => {
  let component: SuccessModal;
  let fixture: ComponentFixture<SuccessModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccessModal],
      providers: [provideTestTranslations()],
    }).compileComponents();

    fixture = TestBed.createComponent(SuccessModal);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('product', PRODUCTS[0]);
    fixture.componentRef.setInput('step', 1);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows the first step pagination', () => {
    expect(fixture.nativeElement.textContent).toContain('1/2');
  });

  it('emits next from the first step', () => {
    let next = false;
    component.next.subscribe(() => (next = true));
    fixture.nativeElement.querySelector('.btn-brand').click();
    expect(next).toBe(true);
  });

  it('shows the second step content', async () => {
    fixture.componentRef.setInput('step', 2);
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain('2/2');
    expect(fixture.nativeElement.textContent).toContain('Что дальше');
  });

  it('shows a placeholder cover when the product has no image', async () => {
    const withoutCover = PRODUCTS.find((product) => !product.coverImage)!;
    fixture.componentRef.setInput('product', withoutCover);
    await fixture.whenStable();

    expect(fixture.nativeElement.querySelector('img')).toBeNull();
    expect(fixture.nativeElement.textContent).toContain(withoutCover.name);
  });

  it('emits back from the second step', async () => {
    fixture.componentRef.setInput('step', 2);
    await fixture.whenStable();

    let wentBack = false;
    component.back.subscribe(() => (wentBack = true));
    fixture.nativeElement.querySelector('button').click();
    expect(wentBack).toBe(true);
  });

  it('emits finish from the second step', async () => {
    fixture.componentRef.setInput('step', 2);
    await fixture.whenStable();

    let finished = false;
    component.finish.subscribe(() => (finished = true));
    fixture.nativeElement.querySelector('.btn-brand').click();
    expect(finished).toBe(true);
  });

  it('emits finish when closing the first step', () => {
    let finished = false;
    component.finish.subscribe(() => (finished = true));
    fixture.nativeElement.querySelector('[tabindex="-1"]').click();
    expect(finished).toBe(true);
  });
});
