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
  private msg: string | undefined;
  private hideMsg: boolean | undefined;
  private state = true;
  private subscriber$: Subscription | undefined;

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
    } else {
      this.renderer.appendChild(this.el, this.messageEl);
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

  @Input()
  set marginTop(pixelsStr: string | undefined) {
    if (pixelsStr) {
      this.renderer.setStyle(this.backdrop, 'top', pixelsStr);
      this.renderer.setStyle(this.backdrop, 'height', `calc(100vh - ${pixelsStr})`);
    }
  }

  ngOnInit(): void {
    this.subscriber$ = this.ngxLoadingService.initSubscription(
      !this.msg && !this.hideMsg ? (str: string) => this.appendMessageEl(str) : undefined
    );
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
    this.renderer.appendChild(this.elRef.nativeElement, this.backdrop);
    this.renderer.appendChild(this.elRef.nativeElement, this.el);
  }
}
