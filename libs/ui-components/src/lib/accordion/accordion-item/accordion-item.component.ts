import { Component, ElementRef, Input, Output, ViewChild } from '@angular/core';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { GrowIn, ShrinkOut } from '../../animations';

@Component({
  selector: 'rob-accordion-item',
  templateUrl: './accordion-item.component.html',
  styleUrls: ['./accordion-item.component.scss'],
  animations: [GrowIn('200ms'), ShrinkOut('100ms')]
})
export class AccordionItemComponent {
  @Input() title: string;

  @Input() id: string;

  @Output() accordionClick: Subject<AccordionItemComponent> = new Subject();

  @ViewChild('accordionButton')
  accordionButton: ElementRef<HTMLButtonElement>;

  public state: 'open' | 'closed' = 'closed';

  public faChevronDown = faChevronDown;

  public handleClick() {
    this.accordionClick.next(this);
  }
}
