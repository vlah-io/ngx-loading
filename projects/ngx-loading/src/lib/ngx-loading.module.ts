import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {LoadingComponent} from './component/loading.component';
import {LoadingDirective} from './directive/loading.directive';
import {BouncingDotsDirective} from './directive/bouncing-dots.directive';
import {SlidingDotsDirective} from './directive/sliding-dots.directive';
import {PageLoadingComponent} from './component/page-loading.component';
import {SlidingDotsComponent} from './component/sliding-dots.component';
import {BouncingDotsComponent} from './component/bouncing-dots.component';
import {PageLoadingDirective} from './directive/page-loading.directive';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule
  ],
  declarations: [
    LoadingComponent,
    LoadingDirective,
    BouncingDotsDirective,
    SlidingDotsDirective,
    PageLoadingDirective,
    PageLoadingComponent,
    SlidingDotsComponent,
    BouncingDotsComponent
  ],
  exports: [
    LoadingComponent,
    LoadingDirective,
    BouncingDotsDirective,
    SlidingDotsDirective,
    PageLoadingDirective,
    PageLoadingComponent,
    SlidingDotsComponent,
    BouncingDotsComponent
  ]
})
export class NgxLoadingModule {
}
