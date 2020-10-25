import {Directive, ElementRef, Input, Renderer2} from '@angular/core';
import {RendererWorker} from '@vlah.io/ngx-worker';

@Directive({
  selector: '[vlahioLoading]'
})
export class LoadingDirective {
  readonly el: HTMLSpanElement;
  private color: string;
  private position: string;

  constructor(private elRef: ElementRef,
              private renderer: Renderer2,
              private rendererWorker: RendererWorker
  ) {
    this.el = this.renderer.createElement('span');
  }

  @Input('isVisible')
  set _isVisible(state: boolean) {
    if (state === true) {
      this.addClass(this.color);
      this.render(this.position);
    } else {
      this.rendererWorker.removeChildNodes(this.elRef.nativeElement);
    }
  }

  @Input('color')
  set _color(color: string) {
    this.addClass(color);
  }

  @Input('align')
  set _align(position: string) {
    this.render(position);
  }

  addClass(color?: string): void {
    if (Object.prototype.toString.call(color) === '[object String]') {
      this.color = color;
      this.renderer.removeAttribute(this.el, 'class');
    }

    this.renderer.addClass(this.el, 'vlahio-loader');
    this.renderer.addClass(this.el, color || 'vlahio-dark');
  }

  render(position?: string): void {
    let spanElement;
    if (Object.prototype.toString.call(position) === '[object String]') {
      this.position = position;
      spanElement = this.renderer.createElement('span');
      this.renderer.setStyle(spanElement, 'text-align', position);
      this.renderer.setStyle(spanElement, 'display', 'block');
      this.renderer.appendChild(spanElement, this.el);
      this.rendererWorker.removeChildNodes(this.elRef.nativeElement);
    }

    this.renderer.appendChild(this.elRef.nativeElement, spanElement || this.el);
  }
}
