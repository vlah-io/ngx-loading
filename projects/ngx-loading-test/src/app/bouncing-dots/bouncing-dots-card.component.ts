import {Component, ComponentRef, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {DisplayOptionsInterface} from '../../../../ngx-loading/src/lib/interface/ngx-loading.interface';
import {BouncingDotsWorker} from '../../../../ngx-loading/src/lib/service/bouncing-dots.worker';
import {BouncingDotsComponent} from '../../../../ngx-loading/src/lib/component/bouncing-dots.component';

@Component({
  selector: 'app-bouncing-dots-example',
  templateUrl: './bouncing-dots-card.component.html'
})
export class BouncingDotsCardComponent implements OnInit {
  private compRef: ComponentRef<BouncingDotsComponent>;

  @Input() hideMessage: boolean;
  @Input() message: string;
  @Input() title: string;

  @Input('toggle')
  set _toggle(toggle: boolean) {
    if (this.compRef) {
      this.bouncingDotsWorker.destroy(this.compRef);
    }
    if (toggle) {
      this.bind();
    }
  }

  @ViewChild('dotsContainer', {static: true}) container: ElementRef;

  constructor(private bouncingDotsWorker: BouncingDotsWorker) {
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
      container: this.container.nativeElement
    };
    this.compRef = this.bouncingDotsWorker.display(options);
  }
}
