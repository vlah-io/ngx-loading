import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NgxLoadingService {
  constructor(private translate: TranslateService) {
  }

  initSubscription(callback?: (str: string) => void): Subscription | undefined {
    if (callback) {
      return this.translate.stream('vlahio.loading').subscribe(
        (str: string) => {
          callback(str);
        }
      );
    }

    return undefined;
  }
}
