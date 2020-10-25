import {Component} from '@angular/core';
import {PageLoadingWorker} from '../../../ngx-loading/src/lib/service/page-loading.worker';
import {DisplayOptionsInterface} from '../../../ngx-loading/src/lib/interface/ngx-loading.interface';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngx-loading-test';

  constructor(private pageLoadingFactoryWorker: PageLoadingWorker,
              private translate: TranslateService
  ) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  showPageLoading(options?: DisplayOptionsInterface): void {
    const compRef = this.pageLoadingFactoryWorker.display(options);
    setTimeout(
      () => this.pageLoadingFactoryWorker.destroy(compRef), 3000
    );
  }
}
