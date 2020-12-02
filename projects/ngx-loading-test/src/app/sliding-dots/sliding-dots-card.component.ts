import {Component, ComponentRef, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {DisplayOptionsInterface} from '../../../../ngx-loading/src/lib/interface/ngx-loading.interface';
import {SlidingDotsWorker} from '../../../../ngx-loading/src/lib/service/sliding-dots.worker';
import {SlidingDotsComponent} from '../../../../ngx-loading/src/lib/component/sliding-dots.component';

@Component({
  selector: 'app-sliding-dots-example',
  templateUrl: './sliding-dots-card.component.html'
})
export class SlidingDotsCardComponent implements OnInit {
  @Input() hideMessage: boolean | undefined;
  @Input() message: string | undefined;
  @Input() title: string | undefined;
  @ViewChild('dotsContainer', {static: true}) container: ElementRef | undefined;
  private compRef: ComponentRef<SlidingDotsComponent> | undefined;

  constructor(private slidingDotsWorker: SlidingDotsWorker) {
  }

  @Input()
  set toggle(bool: boolean) {
    if (this.compRef) {
      this.slidingDotsWorker.destroy(this.compRef);
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
    this.compRef = this.slidingDotsWorker.display(options);
  }
}
