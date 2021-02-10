import {
  Directive,
  Input,
  HostListener,
  ElementRef,
  ComponentRef,
  ComponentFactoryResolver,
  Injector,
  ViewContainerRef,
  OnDestroy
} from '@angular/core';
import { TooltipComponent } from './tooltip.component';

@Directive({
  selector: '[robTooltip]'
})
export class TooltipDirective implements OnDestroy {
  @Input('robTooltip') tooltipText = '';

  @Input() tooltipPosition: 'top' | 'bottom' | 'left' | 'right';

  @Input() delay = 0;

  public timeout: number;

  private componentRef: ComponentRef<TooltipComponent>;

  constructor(
    private readonly el: ElementRef,
    private resolver: ComponentFactoryResolver,
    private vcr: ViewContainerRef
  ) {}

  @HostListener('mouseover')
  public handleMouseOver() {
    this.create();
  }

  @HostListener('mouseleave')
  public handleMouseLeave() {
    clearTimeout(this.timeout);
    this.destroy();
  }

  private create() {
    if (this.componentRef) return;
    setTimeout(() => {
      const factory = this.resolver.resolveComponentFactory(TooltipComponent);
      const injector = Injector.create({
        providers: [
          {
            provide: 'tooltipConfig',
            useValue: {
              host: this.el.nativeElement,
              position: this.tooltipPosition || 'top',
              content: this.tooltipText
            }
          }
        ]
      });
      this.componentRef = this.vcr.createComponent(factory, 0, injector);
    }, this.delay);
  }

  private destroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }

  public ngOnDestroy() {
    this.destroy();
  }
}
