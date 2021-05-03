import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';
import Prism from 'prismjs';

@Directive({
  selector: '[robCodeHighlight]'
})
export class CodeHighlightDirective implements AfterViewInit {
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('robCodeHighlight') public lang: string;

  constructor(private readonly el: ElementRef) {}

  public get prismLang() {
    return this.lang ? Prism.languages[this.lang] : undefined;
  }

  ngAfterViewInit() {
    this.highlight();
  }

  public highlight() {
    console.log(this);
    this.el.nativeElement.innerHTML = Prism.highlight(
      this.el.nativeElement.innerHTML,
      this.prismLang,
      this.lang
    );
  }
}
