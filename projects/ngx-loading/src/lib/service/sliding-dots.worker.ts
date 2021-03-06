import {ComponentRef, EventEmitter, Injectable} from '@angular/core';
import {DisplayOptionsInterface} from '../interface/ngx-loading.interface';
import {FactoryWorker} from '@vlah.io/ngx-worker';
import {SlidingDotsComponent} from '../component/sliding-dots.component';

@Injectable({
  providedIn: 'root'
})
export class SlidingDotsWorker {
  constructor(private factoryWorker: FactoryWorker) {
  }

  get error$(): EventEmitter<DOMException> {
    return this.factoryWorker.error$;
  }

  display(options: DisplayOptionsInterface = {}): ComponentRef<SlidingDotsComponent> {
    const {message, hideMessage, container} = options;

    const compRef = this.factoryWorker.make(SlidingDotsComponent);
    const compRefInstance = compRef.instance as SlidingDotsComponent;

    compRefInstance.message = message;
    compRefInstance.hideMessage = hideMessage;

    this.factoryWorker.glue(compRef, {container});

    return compRef;
  }

  destroy(compRef: ComponentRef<SlidingDotsComponent>): void {
    this.factoryWorker.destroy(compRef);
  }
}
