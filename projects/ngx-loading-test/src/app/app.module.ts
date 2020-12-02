import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgxLoadingModule} from '../../../ngx-loading/src/lib/ngx-loading.module';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {ListCssClassesComponent} from './loading/list-css-classes.component';
import {ListOptionsComponent} from './loading/list-options.component';
import {SlidingDotsCardComponent} from './sliding-dots/sliding-dots-card.component';
import {BouncingDotsCardComponent} from './bouncing-dots/bouncing-dots-card.component';
import {BouncingDotsTemplateComponent} from './bouncing-dots/bouncing-dots-template.component';
import {SlidingDotsTemplateComponent} from './sliding-dots/sliding-dots-template.component';
import {PageLoaderTemplateComponent} from './page-loader/page-loader-template.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

export const HttpLoaderFactory = (http: HttpClient): TranslateHttpLoader => new TranslateHttpLoader(http);

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxLoadingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'en'
    }),
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    ListCssClassesComponent,
    ListOptionsComponent,
    SlidingDotsCardComponent,
    SlidingDotsTemplateComponent,
    BouncingDotsCardComponent,
    BouncingDotsTemplateComponent,
    PageLoaderTemplateComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
