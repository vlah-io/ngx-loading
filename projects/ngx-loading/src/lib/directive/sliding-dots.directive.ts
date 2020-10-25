import {Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {RendererWorker} from '@vlah.io/ngx-worker';
import {Subscription} from 'rxjs';
import {NgxLoadingService} from '../service/ngx-loading.service';

@Directive({
  selector: '[vlahioSlidingDots]'
})
export class SlidingDotsDirective implements OnDestroy, OnInit {
  readonly el: HTMLDivElement;
  readonly messageEl: HTMLDivElement;
  private subscriber$: Subscription;
  private message: string;
  private hideMessage: boolean;
  private state: boolean;

  constructor(protected elRef: ElementRef,
              protected renderer: Renderer2,
              protected translate: TranslateService,
              private rendererWorker: RendererWorker,
              private ngxLoadingService: NgxLoadingService
  ) {
    this.el = this.rendererWorker.createElement('div') as HTMLDivElement;

    const spinnerEl = this.rendererWorker.createElement(
      'div',
      'vlahio-sliding-dots'
    ) as HTMLDivElement;
    for (let x = 0; x < 4; x++) {
      this.renderer.appendChild(
        spinnerEl,
        this.renderer.createElement('div')
      );
    }
    this.renderer.appendChild(this.el, spinnerEl);

    this.messageEl = this.rendererWorker.createElement('div') as HTMLDivElement;
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

  ngOnInit(): void {
    this.subscriber$ = this.ngxLoadingService.initSubscription(
      !this.message && !this.hideMessage ? (str: string) => this.appendMessageEl(str) : undefined
    );

    if (!this.hideMessage) {
      this.renderer.insertBefore(this.el, this.messageEl, this.el.firstChild);
    }
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
    this.renderer.appendChild(this.elRef.nativeElement, this.el);
  }
}
