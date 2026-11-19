import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridLine } from './grid-line';

describe('GridLine', () => {
  let component: GridLine;
  let fixture: ComponentFixture<GridLine>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridLine],
    }).compileComponents();

    fixture = TestBed.createComponent(GridLine);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('basis', 25);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('computes grid-cols-4 for basis 25', () => {
    expect(component.hostClasses()).toContain('grid-cols-4');
  });

  it('computes grid-cols-1 for basis 100', () => {
    fixture.componentRef.setInput('basis', 100);
    expect(component.hostClasses()).toContain('grid-cols-1');
  });
});
