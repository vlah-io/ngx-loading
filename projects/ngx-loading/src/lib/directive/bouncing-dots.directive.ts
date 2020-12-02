import {Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {RendererWorker} from '@vlah.io/ngx-worker';
import {Subscription} from 'rxjs';
import {NgxLoadingService} from '../service/ngx-loading.service';

@Directive({
  selector: '[vlahioBouncingDots]'
})
export class BouncingDotsDirective implements OnDestroy, OnInit {
  readonly el: HTMLDivElement;
  readonly messageEl: HTMLDivElement;
  private subscriber$: Subscription | undefined;
  private msg: string | undefined;
  private hideMsg: boolean | undefined;
  private state: boolean | undefined;

  constructor(protected elRef: ElementRef,
              protected renderer: Renderer2,
              protected translate: TranslateService,
              private rendererWorker: RendererWorker,
              private ngxLoadingService: NgxLoadingService
  ) {
    this.el = this.rendererWorker.createElement(
      'div',
      'vlahio-bouncing-container'
    ) as HTMLDivElement;

    const spinnerEl = this.rendererWorker.createElement(
      'div',
      'vlahio-bouncing'
    ) as HTMLDivElement;
    ['vlahio-bounce1', 'vlahio-bounce2', undefined].forEach(
      (cls: string | undefined) => {
        const div = this.rendererWorker.createElement(
          'div',
          cls
        ) as HTMLDivElement;
        this.renderer.appendChild(spinnerEl, div);
      }
    );
    this.renderer.appendChild(this.el, spinnerEl);

    this.messageEl = this.rendererWorker.createElement(
      'div'
    ) as HTMLDivElement;
  }

  @Input()
  set message(str: string | undefined) {
    if (Object.prototype.toString.call(str) === '[object String]') {
      this.msg = str;
      this.appendMessageEl(str);
    }
  }

  @Input()
  set hideMessage(bool: boolean | undefined) {
    if (bool) {
      this.hideMsg = bool;
    }
  }

  @Input()
  set isVisible(bool: boolean) {
    this.state = bool;
    this.rendererWorker.removeChildNodes(this.elRef.nativeElement);
    if (bool) {
      this.appendEl();
    }
  }

  ngOnInit(): void {
    this.subscriber$ = this.ngxLoadingService.initSubscription(
      !this.msg && !this.hideMsg ? (str: string) => this.appendMessageEl(str) : undefined
    );

    if (!this.hideMsg) {
      this.renderer.insertBefore(this.el, this.messageEl, this.el.firstChild);
    }
  }

  ngOnDestroy(): void {
    if (this.subscriber$) {
      this.subscriber$.unsubscribe();
    }
  }

  appendMessageEl(str: string | undefined): void {
    if (str) {
      this.rendererWorker.removeChildNodes(this.messageEl);
      this.renderer.appendChild(
        this.messageEl,
        this.renderer.createText(str)
      );
    }
  }

  appendEl(): void {
    this.renderer.appendChild(this.elRef.nativeElement, this.el);
  }
}
