import { Directive, ElementRef, Input, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[highlightConv]',
  standalone: true
})
export class HighlightConversationIdDirective {
  @Input() highlightConv!: string | undefined;

  constructor(
    private el: ElementRef, private renderer: Renderer2
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("HighlightConversationIdDirective, changes:", changes);
    if ("highlightConv" in changes) {
      if (!this.highlightConv) {
        return;
      }
      this.el.nativeElement.style.backgroundColor = "#f0f0f0";
    }
  }
}
