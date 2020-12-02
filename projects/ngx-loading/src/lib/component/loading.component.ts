import {Component, Input} from '@angular/core';

@Component({
  selector: 'vlahio-loading',
  templateUrl: './loading.component.html'
})
export class LoadingComponent {
  private state = true;
  private className: string | undefined;
  private position: 'center' | 'left' | 'right' | undefined;

  get isVisible(): boolean {
    return this.state;
  }

  @Input()
  set isVisible(bool: boolean) {
    this.state = bool;
  }

  get color(): string | undefined {
    return this.className;
  }

  @Input()
  set color(className: string | undefined) {
    if (className) {
      this.className = className;
    }
  }

  get align(): 'center' | 'left' | 'right' | undefined {
    return this.position;
  }

  @Input()
  set align(position: 'center' | 'left' | 'right' | undefined) {
    this.position = position;
  }
}
