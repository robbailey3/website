import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

type FocusableElement =
  | HTMLButtonElement
  | HTMLSelectElement
  | HTMLTextAreaElement
  | HTMLInputElement
  | HTMLAnchorElement;

@Directive({
  selector: '[robFocusTrap]'
})
export class FocusTrapDirective implements AfterViewInit {
  @Input() focusFirstElement = false;

  constructor(private el: ElementRef) {}

  public ngAfterViewInit() {
    this.trapFocus(this.el.nativeElement);
  }

  public trapFocus(element: HTMLElement): void {
    const focusableEls: FocusableElement[] = Array.from(
      element.querySelectorAll(
        'a[href], button, textarea, input[type="text"],' +
          'input[type="radio"], input[type="checkbox"], select'
      )
    ).filter((el: any) => !el.disabled) as FocusableElement[];

    const firstFocusableEl: FocusableElement = focusableEls[0];

    const lastFocusableEl: FocusableElement =
      focusableEls[focusableEls.length - 1];

    if (this.focusFirstElement) {
      firstFocusableEl.focus();
    }

    element.addEventListener('keydown', (e: KeyboardEvent) => {
      const isTabPressed = e.keyCode === 9 || e.key === 'Tab'; // isTabPressed
      if (!isTabPressed) return;

      if (e.shiftKey) {
        /* shift + tab */ if (document.activeElement === firstFocusableEl) {
          lastFocusableEl.focus();
          e.preventDefault();
        }
      } /* tab */ else if (document.activeElement === lastFocusableEl) {
        firstFocusableEl.focus();
        e.preventDefault();
      }
    });
  }
}
