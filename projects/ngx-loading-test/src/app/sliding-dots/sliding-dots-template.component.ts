import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-sliding-dots-template',
  templateUrl: './sliding-dots-template.component.html'
})
export class SlidingDotsTemplateComponent {
  state = true;

  constructor(private translation: TranslateService) {
  }

  changeLang(lang: string): void {
    if (this.isCurrentLang(lang)) {
      console.log('Nothing to do in here. Already using this language!');
      return;
    }
    this.translation.use(lang);
  }

  isCurrentLang(lang: string): boolean {
    return lang === this.translation.currentLang;
  }
}
