import {Component, Input} from '@angular/core';

@Component({
  selector: 'vlahio-page-loader',
  template: `
    <div vlahioPageLoading
         [isVisible]="state"
         [marginTop]="marginTop"
         [message]="message"
         [hideMessage]="hideMessage"></div>
  `
})
export class PageLoadingComponent {
  state = true;
  marginTop: string;
  message: string;
  hideMessage: boolean;

  @Input('isVisible')
  set _isVisible(state: boolean) {
    this.state = state;
  }

  @Input('message')
  set _message(message: string) {
    this.message = message;
  }

  @Input('hideMessage')
  set _hideMessage(hideMessage: boolean) {
    this.hideMessage = hideMessage;
  }

  @Input('marginTop')
  set _marginTop(marginTop: string) {
    this.marginTop = marginTop;
  }
}
