import {Component} from '@angular/core';
import {PageLoadingWorker} from '../../../../ngx-loading/src/lib/service/page-loading.worker';
import {DisplayOptionsInterface} from '../../../../ngx-loading/src/lib/interface/ngx-loading.interface';

@Component({
  selector: 'app-page-loader-template',
  templateUrl: './page-loader-template.component.html'
})
export class PageLoaderTemplateComponent {

  constructor(private pageLoadingWorker: PageLoadingWorker) {
  }

  show(options?: DisplayOptionsInterface): void {
    const compRef = this.pageLoadingWorker.display(options);
    setTimeout(
      () => this.pageLoadingWorker.destroy(compRef), 3000
    );
  }
}
