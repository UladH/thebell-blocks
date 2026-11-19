import { Component, computed, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-grid-cell',
  templateUrl: './grid-cell.html',
  host: {
    '[class]': 'hostClasses()',
  },
})
export class GridCell {
  readonly withImage = input(false);

  readonly hostClasses = computed(() => {
    const base =
      'relative block box-border h-full min-w-0 overflow-hidden rounded-lg max-md:min-h-[250px]';
    return this.withImage() ? base : `${base} card-outline`;
  });
}
