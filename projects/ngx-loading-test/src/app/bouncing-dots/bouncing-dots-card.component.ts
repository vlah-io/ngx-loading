import {Component, ComponentRef, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {DisplayOptionsInterface} from '../../../../ngx-loading/src/lib/interface/ngx-loading.interface';
import {BouncingDotsWorker} from '../../../../ngx-loading/src/lib/service/bouncing-dots.worker';
import {BouncingDotsComponent} from '../../../../ngx-loading/src/lib/component/bouncing-dots.component';

@Component({
  selector: 'app-bouncing-dots-example',
  templateUrl: './bouncing-dots-card.component.html'
})
export class BouncingDotsCardComponent implements OnInit {
  @Input() hideMessage: boolean | undefined;
  @Input() message: string | undefined;
  @Input() title: string | undefined;
  @ViewChild('dotsContainer', {static: true}) container: ElementRef | undefined;
  private compRef: ComponentRef<BouncingDotsComponent> | undefined;

  constructor(private bouncingDotsWorker: BouncingDotsWorker) {
  }

  @Input()
  set toggle(bool: boolean) {
    if (this.compRef) {
      this.bouncingDotsWorker.destroy(this.compRef);
    }
    if (bool) {
      this.bind();
    }
  }

  ngOnInit(): void {
    if (!this.compRef) {
      this.bind();
    }
  }

  bind(): void {
    const options: DisplayOptionsInterface = {
      message: this.message,
      hideMessage: this.hideMessage,
      container: this.container?.nativeElement
    };
    this.compRef = this.bouncingDotsWorker.display(options);
  }
}
