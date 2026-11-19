import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PRODUCTS } from '@data/product';
import { TariffModal } from './tariff-modal';
import { ProductTariff } from '@models/product.model';
import { provideTestTranslations } from '@testing/translate-testing';

describe('TariffModal', () => {
  let component: TariffModal;
  let fixture: ComponentFixture<TariffModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TariffModal],
      providers: [provideTestTranslations()],
    }).compileComponents();

    fixture = TestBed.createComponent(TariffModal);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('product', PRODUCTS[0]);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('preselects the first tariff', () => {
    expect(component.selectedTariffId()).toBe(PRODUCTS[0].tariffs![0].id);
  });

  it('emits the selected tariff on next', () => {
    let emitted: ProductTariff | undefined;
    component.tariffSelected.subscribe((tariff) => (emitted = tariff));
    component.onNext();
    expect(emitted).toBe(PRODUCTS[0].tariffs![0]);
  });

  it('switches the selected tariff on click', () => {
    const secondTariff = PRODUCTS[0].tariffs![1];
    component.selectedTariffId.set(secondTariff.id);
    expect(component.selectedTariff()).toBe(secondTariff);
  });

  it('switches the selected tariff via a real DOM click', () => {
    const secondTariffButton: HTMLButtonElement =
      fixture.nativeElement.querySelectorAll('button:not(.btn-brand)')[1];
    secondTariffButton.click();

    expect(component.selectedTariffId()).toBe(PRODUCTS[0].tariffs![1].id);
  });

  it('emits via a real DOM click on the cta button', () => {
    let emitted: ProductTariff | undefined;
    component.tariffSelected.subscribe((tariff) => (emitted = tariff));
    const ctaButton: HTMLButtonElement = fixture.nativeElement.querySelector('.btn-brand');
    ctaButton.click();
    expect(emitted).toBe(PRODUCTS[0].tariffs![0]);
  });

  it('shows the old price struck through for a discounted tariff', async () => {
    const yearlyTariff = PRODUCTS[0].tariffs!.find((tariff) => tariff.priceUsdOld)!;
    component.selectedTariffId.set(yearlyTariff.id);
    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain(`$${yearlyTariff.priceUsdOld}`);
  });

  it('has no preselected tariff for a product without tariffs', async () => {
    const withoutTariffs = PRODUCTS.find((product) => !product.tariffs)!;
    fixture.componentRef.setInput('product', withoutTariffs);
    await fixture.whenStable();

    expect(component.selectedTariffId()).toBeNull();
    expect(component.selectedTariff()).toBeUndefined();

    let emitted: ProductTariff | undefined;
    component.tariffSelected.subscribe((tariff) => (emitted = tariff));
    component.onNext();
    expect(emitted).toBeUndefined();
  });
});
