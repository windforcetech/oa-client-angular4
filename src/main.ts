import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import {ApplicationService} from './app/common/service/application.service';

if (environment.production) {

}
enableProdMode();

platformBrowserDynamic().bootstrapModule(AppModule, [ApplicationService]);
