import {Component, ComponentRef, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {DisplayOptionsInterface} from '../../../../ngx-loading/src/lib/interface/ngx-loading.interface';
import {SlidingDotsWorker} from '../../../../ngx-loading/src/lib/service/sliding-dots.worker';
import {SlidingDotsComponent} from '../../../../ngx-loading/src/lib/component/sliding-dots.component';

@Component({
  selector: 'app-sliding-dots-example',
  templateUrl: './sliding-dots-card.component.html'
})
export class SlidingDotsCardComponent implements OnInit {
  private compRef: ComponentRef<SlidingDotsComponent>;

  @Input() hideMessage: boolean;
  @Input() message: string;
  @Input() title: string;

  @Input('toggle')
  set _toggle(toggle: boolean) {
    if (this.compRef) {
      this.slidingDotsWorker.destroy(this.compRef);
    }
    if (toggle) {
      this.bind();
    }
  }

  @ViewChild('dotsContainer', {static: true}) container: ElementRef;

  constructor(private slidingDotsWorker: SlidingDotsWorker) {
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
    this.compRef = this.slidingDotsWorker.display(options);
  }
}
