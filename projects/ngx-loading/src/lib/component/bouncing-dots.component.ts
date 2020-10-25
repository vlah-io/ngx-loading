import {Component, Input} from '@angular/core';

@Component({
  selector: 'vlahio-bouncing-dots',
  template: `
    <div vlahioBouncingDots
         [hideMessage]="hideMessage"
         [message]="message"
         [isVisible]="state"></div>
  `
})
export class BouncingDotsComponent {
  state = true;
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
}
