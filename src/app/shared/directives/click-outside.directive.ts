import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

/**
 * Emits when a click occurs outside the host element.
 * Usage: <div (clickOutside)="close()">...</div>
 */
@Directive({ selector: '[clickOutside]', standalone: true })
export class ClickOutsideDirective {
  @Output() clickOutside = new EventEmitter<void>();

  constructor(private el: ElementRef) {}

  @HostListener('document:click', ['$event.target'])
  onClick(target: HTMLElement): void {
    if (!this.el.nativeElement.contains(target)) {
      this.clickOutside.emit();
    }
  }
}
