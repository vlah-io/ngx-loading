import {Directive, ElementRef, Input, Renderer2} from '@angular/core';
import {RendererWorker} from '@vlah.io/ngx-worker';

@Directive({
  selector: '[vlahioLoading]'
})
export class LoadingDirective {
  readonly el: HTMLSpanElement;
  private className: string | undefined;
  private position: 'center' | 'left' | 'right' | undefined;

  constructor(private elRef: ElementRef,
              private renderer: Renderer2,
              private rendererWorker: RendererWorker
  ) {
    this.el = this.renderer.createElement('span');
  }

  @Input()
  set isVisible(state: boolean) {
    if (state) {
      this.addClass(this.className);
      this.render(this.position);
    } else {
      this.rendererWorker.removeChildNodes(this.elRef.nativeElement);
    }
  }

  @Input()
  set color(className: string | undefined) {
    this.addClass(className);
  }

  @Input()
  set align(position: 'center' | 'left' | 'right' | undefined) {
    this.render(position);
  }

  addClass(className?: string): void {
    if (Object.prototype.toString.call(className) === '[object String]') {
      this.className = className;
      this.renderer.removeAttribute(this.el, 'class');
    }

    this.renderer.addClass(this.el, 'vlahio-loader');
    this.renderer.addClass(this.el, className || 'vlahio-dark');
  }

  render(position?: 'center' | 'left' | 'right' | undefined): void {
    let spanElement;
    if (Object.prototype.toString.call(position) === '[object String]') {
      this.position = position;
      spanElement = this.renderer.createElement('span');
      if (position) {
        this.renderer.setStyle(spanElement, 'text-align', position);
      }
      this.renderer.setStyle(spanElement, 'display', 'block');
      this.renderer.appendChild(spanElement, this.el);
      this.rendererWorker.removeChildNodes(this.elRef.nativeElement);
    }

    this.renderer.appendChild(this.elRef.nativeElement, spanElement || this.el);
  }
}
