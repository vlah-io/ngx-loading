import {Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';
import {RendererWorker} from '@vlah.io/ngx-worker';
import {NgxLoadingService} from '../service/ngx-loading.service';

@Directive({
  selector: '[vlahioPageLoading]'
})
export class PageLoadingDirective implements OnInit, OnDestroy {
  readonly backdrop: HTMLDivElement;
  readonly el: HTMLDivElement;
  readonly messageEl: HTMLDivElement;
  private message: string;
  private hideMessage: boolean;
  private state = true;
  private subscriber$: Subscription;

  constructor(private elRef: ElementRef,
              private renderer: Renderer2,
              private translate: TranslateService,
              private rendererWorker: RendererWorker,
              private ngxLoadingService: NgxLoadingService
  ) {
    this.backdrop = this.rendererWorker.createElement(
      'div',
      'vlahio-page-loader-backdrop'
    ) as HTMLDivElement;

    this.el = this.rendererWorker.createElement(
      'div',
      'vlahio-page-loader'
    ) as HTMLDivElement;

    const spinner = this.rendererWorker.createElement(
      'div',
      'vlahio-square-spinner'
    ) as HTMLDivElement;
    this.renderer.appendChild(this.el, spinner);

    this.messageEl = this.rendererWorker.createElement(
      'div',
      'vlahio-text'
    ) as HTMLDivElement;
  }

  @Input('message')
  set _message(message: string) {
    if (Object.prototype.toString.call(message) === '[object String]') {
      this.message = message;
      this.appendMessageEl(message);
    }
  }

  @Input('hideMessage')
  set _hideMessage(val: boolean) {
    if (val === true) {
      this.hideMessage = val;
    } else {
      this.renderer.appendChild(this.el, this.messageEl);
    }
  }

  @Input('isVisible')
  set _isVisible(val: boolean) {
    this.state = val;
    this.rendererWorker.removeChildNodes(this.elRef.nativeElement);
    if (val === true) {
      this.appendEl();
    }
  }

  @Input('marginTop')
  set _marginTop(marginTop: string) {
    this.renderer.setStyle(this.backdrop, 'top', marginTop);
    this.renderer.setStyle(this.backdrop, 'height', `calc(100vh - ${marginTop})`);
  }

  ngOnInit(): void {
    this.subscriber$ = this.ngxLoadingService.initSubscription(
      !this.message && !this.hideMessage ? (str: string) => this.appendMessageEl(str) : undefined
    );
  }

  ngOnDestroy(): void {
    if (this.subscriber$) {
      this.subscriber$.unsubscribe();
    }
  }

  appendMessageEl(str: string): void {
    this.rendererWorker.removeChildNodes(this.messageEl);
    this.renderer.appendChild(
      this.messageEl,
      this.renderer.createText(str)
    );
  }

  appendEl(): void {
    this.renderer.appendChild(this.elRef.nativeElement, this.backdrop);
    this.renderer.appendChild(this.elRef.nativeElement, this.el);
  }
}
