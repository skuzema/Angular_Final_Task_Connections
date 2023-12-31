/* eslint-disable @angular-eslint/directive-selector */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
import {
    Directive,
    ElementRef,
    Input,
    Renderer2,
    SimpleChanges,
} from "@angular/core";

@Directive({
    selector: "[highlightConv]",
    standalone: true,
})
export class HighlightConversationIdDirective {
    @Input() highlightConv!: string | undefined;

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    ngOnChanges(changes: SimpleChanges): void {
        if ("highlightConv" in changes) {
            if (!this.highlightConv) {
                return;
            }
            this.el.nativeElement.style.backgroundColor = "#db8e8e";
        }
    }
}
