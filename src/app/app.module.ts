import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRouterModule} from './app.module.router';
import {CommonComponentModule} from './common/component/common-component.module';
import {ApplicationService} from './common/service/application.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRouterModule,
    HttpModule,
    CommonComponentModule
  ],
  providers: [
    ApplicationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
