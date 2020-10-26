import {ComponentRef, EventEmitter, Injectable} from '@angular/core';
import {PageLoadingComponent} from '../component/page-loading.component';
import {DisplayOptionsInterface} from '../interface/ngx-loading.interface';
import {FactoryWorker} from '@vlah.io/ngx-worker';

@Injectable({
  providedIn: 'root'
})
export class PageLoadingWorker {
  constructor(private factoryWorker: FactoryWorker) {
  }

  get error$(): EventEmitter<DOMException> {
    return this.factoryWorker.error$;
  }

  display(options: DisplayOptionsInterface = {}): ComponentRef<PageLoadingComponent> {
    const {message, marginTop, container, hideMessage} = options;

    const compRef = this.factoryWorker.make(PageLoadingComponent);
    const compRefInstance = compRef.instance as PageLoadingComponent;

    compRefInstance._message = message;
    compRefInstance._marginTop = marginTop;
    compRefInstance._hideMessage = hideMessage;

    this.factoryWorker.glue(compRef, {container});

    return compRef;
  }

  destroy(compRef: ComponentRef<PageLoadingComponent>): void {
    this.factoryWorker.destroy(compRef);
  }
}
