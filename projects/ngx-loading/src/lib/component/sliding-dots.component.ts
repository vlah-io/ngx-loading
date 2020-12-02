import {Component, Input} from '@angular/core';

@Component({
  selector: 'vlahio-sliding-dots',
  templateUrl: './sliding-dots.component.html'
})
export class SlidingDotsComponent {
  private state = true;
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
}
