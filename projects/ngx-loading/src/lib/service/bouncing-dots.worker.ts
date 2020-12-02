import {ComponentRef, EventEmitter, Injectable} from '@angular/core';
import {DisplayOptionsInterface} from '../interface/ngx-loading.interface';
import {FactoryWorker} from '@vlah.io/ngx-worker';
import {BouncingDotsComponent} from '../component/bouncing-dots.component';

@Injectable({
  providedIn: 'root'
})
export class BouncingDotsWorker {
  constructor(private factoryWorker: FactoryWorker) {
  }

  get error$(): EventEmitter<DOMException> {
    return this.factoryWorker.error$;
  }

  display(options: DisplayOptionsInterface = {}): ComponentRef<BouncingDotsComponent> {
    const {message, hideMessage, container} = options;

    const compRef = this.factoryWorker.make(BouncingDotsComponent);
    const compRefInstance = compRef.instance as BouncingDotsComponent;

    compRefInstance.message = message;
    compRefInstance.hideMessage = hideMessage;

    this.factoryWorker.glue(compRef, {container});

    return compRef;
  }

  destroy(compRef: ComponentRef<BouncingDotsComponent>): void {
    this.factoryWorker.destroy(compRef);
  }
}
