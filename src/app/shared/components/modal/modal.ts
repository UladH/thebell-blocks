import { Component, ElementRef, afterNextRender, input, output, viewChild } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [TranslatePipe],
  selector: 'app-modal',
  templateUrl: './modal.html',
  host: {
    class: 'block',
  },
})
export class Modal {
  readonly pagination = input<string>();
  readonly showBack = input(false);

  readonly back = output<void>();
  readonly closed = output<void>();

  private readonly backdrop = viewChild.required<ElementRef<HTMLElement>>('backdrop');

  constructor() {
    afterNextRender(() => {
      this.backdrop().nativeElement.focus();
    });
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.closed.emit();
    }
  }
}
