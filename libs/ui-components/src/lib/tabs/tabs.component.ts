import {
  Component,
  AfterViewInit,
  ContentChildren,
  QueryList,
  ViewChildren,
  ElementRef,
  HostListener,
  AfterContentInit
} from '@angular/core';
import { TabComponent } from './tab/tab.component';

@Component({
  selector: 'rob-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

  @ViewChildren('tabButton') tabButtons: QueryList<
    ElementRef<HTMLButtonElement>
  >;

  public activeIndex = 0;

  /**
   * Set the first tab to active.
   */
  public ngAfterContentInit(): void {
    this.tabs.first.isActive = true;
  }

  /**
   * Adding keyup event listener to meet WCAG for tabs
   */
  @HostListener('keyup', ['$event'])
  public handleKeypress($event: KeyboardEvent) {
    if ($event.shiftKey || $event.ctrlKey) {
      return;
    }
    const { key } = $event;
    if (key === 'ArrowRight') {
      this.activeIndex =
        this.activeIndex + 1 >= this.tabs.length ? 0 : this.activeIndex + 1;
    }
    if (key === 'ArrowLeft') {
      this.activeIndex =
        this.activeIndex - 1 < 0 ? this.tabs.length - 1 : this.activeIndex - 1;
    }
    if (key === 'Home') {
      this.activeIndex = 0;
    }
    if (key === 'End') {
      this.activeIndex = this.tabs.length - 1;
    }
    this.tabButtons.toArray()[this.activeIndex].nativeElement.focus();
    this.setActiveTab(this.activeIndex);
  }

  /**
   * Handle the user's click on one of the titles and set that tab to active.
   */
  public setActiveTab(index: number) {
    this.activeIndex = index;
    this.deactivateAll();
    this.tabs.toArray()[index].isActive = true;
  }

  /**
   * Deactivate all the tabs
   */
  public deactivateAll() {
    this.tabs.forEach((tab) => {
      tab.isActive = false;
    });
  }
}
