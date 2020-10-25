import {Component, Input} from '@angular/core';

@Component({
  selector: 'vlahio-loading',
  template: `
    <span vlahioLoading
          [isVisible]="state"
          [color]="color"
          [align]="position"></span>
  `
})
export class LoadingComponent {
  state = true;
  color: string;
  position: string;

  @Input('isVisible')
  set _isVisible(state: boolean) {
    this.state = state;
  }

  @Input('color')
  set _color(color: string) {
    this.color = color;
  }

  @Input('align')
  set _align(position: string) {
    this.position = position;
  }
}
