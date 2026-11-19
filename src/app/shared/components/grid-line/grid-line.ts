import { Component, computed, input } from '@angular/core';

export type GridBasis = 25 | 33 | 50 | 100;

const BASIS_CLASSES: Record<GridBasis, string> = {
  25: 'grid-cols-4 min-h-[175px] max-md:grid-cols-1 max-md:min-h-0',
  33: 'grid-cols-3 min-h-[300px] max-md:grid-cols-1 max-md:min-h-0',
  50: 'grid-cols-2 min-h-[300px] max-md:grid-cols-1 max-md:min-h-0',
  100: 'grid-cols-1 min-h-[500px]',
};

@Component({
  imports: [],
  selector: 'app-grid-line',
  templateUrl: './grid-line.html',
  host: {
    '[class]': 'hostClasses()',
  },
})
export class GridLine {
  readonly basis = input.required<GridBasis>();

  readonly hostClasses = computed(() => `grid min-w-0 gap-2 mt-2.5 ${BASIS_CLASSES[this.basis()]}`);
}
