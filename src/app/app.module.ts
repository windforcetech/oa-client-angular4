import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpModule} from '@angular/http';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRouterModule} from './app.module.router';
import {CommonComponentModule} from './common/component/common-component.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRouterModule,
    BrowserAnimationsModule,
    HttpModule,
    CommonComponentModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
