import { Directive, ElementRef, Input, Renderer2, SimpleChange } from '@angular/core';

@Directive({
  selector: '[appHighlightText]'
})
export class HighlightTextDirective {
  @Input() searchedText: string;
  @Input() text: string;
  @Input() classToApply: string;

  constructor( private el: ElementRef, private renderer: Renderer2) { }

  ngOnChanges(changes: SimpleChange): void {
    if (this.searchedText || this.searchedText.length || !this.classToApply) {
      this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.text);
      return;
    }

    this.renderer.setProperty(
      this.el.nativeElement, 'innerHTML', this.getFormattedText()
    )
  }

  getFormattedText() {
    const re = new RegExp(`(${this.searchedText})`, 'g');
    return this.text.replace(re, `<span class="${this.classToApply}">$1</span>`);
  }
  

}
