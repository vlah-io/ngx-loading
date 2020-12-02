import {Component, Input} from '@angular/core';

@Component({
  selector: 'vlahio-page-loader',
  templateUrl: './page-loading.component.html'
})
export class PageLoadingComponent {
  private state = true;
  private pixelsStr: string | undefined;
  private msg: string | undefined;
  private hideMsg: boolean | undefined;

  get isVisible(): boolean {
    return this.state;
  }

  @Input()
  set isVisible(bool: boolean) {
    this.state = bool;
  }

  get message(): string | undefined {
    return this.msg;
  }

  @Input()
  set message(str: string | undefined) {
    this.msg = str;
  }

  get hideMessage(): boolean | undefined {
    return this.hideMsg;
  }

  @Input()
  set hideMessage(bool: boolean | undefined) {
    this.hideMsg = bool;
  }

  get marginTop(): string | undefined {
    return this.pixelsStr;
  }

  @Input()
  set marginTop(str: string | undefined) {
    this.pixelsStr = str;
  }
}
