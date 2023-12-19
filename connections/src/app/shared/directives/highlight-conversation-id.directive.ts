import { Directive, ElementRef, HostListener, Inject, Input } from '@angular/core';
import { PeopleWithConversation } from '../models/data';
import { Observable } from 'rxjs';

@Directive({
  selector: '[highlightConversationId]',
  standalone: true
})
export class HighlightConversationIdDirective {
  @Input() people!: PeopleWithConversation;

  constructor(
    @Inject('peoples$') private peoples$: Observable<PeopleWithConversation[]>,
    private el: ElementRef
  ) { }

  ngOnInit() {
    this.peoples$.subscribe(people => {
      this.people = people[0];
      if (this.people.conversationId) {
        this.el.nativeElement.style.backgroundColor = '#f0f0f0';
      } else {
        this.el.nativeElement.style.backgroundColor = '';
      }
    });
  }
}
