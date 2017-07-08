/**
 * Created by KingKong on 2017/6/8.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {CookieModule} from 'ngx-cookie';
import {InterceptorService} from 'ng2-interceptors';

import {HttpInterceptor} from '../service/http.interceptor';
import {HttpService} from '../service/http.service';

import {HomeService} from '../service/home.service';
import {UserService} from '../service/user.service';
import {PatientService} from '../service/patient.service';
import {MainService} from '../service/main.service';
import {ScheduleService} from '../service/schedule.service';
import {ApplicationService} from '../service/application.service';
import {LocalStorageService} from '../service/local-storage.service';
import {CustomizeSliderService} from '../service/customize-slider.service';
import {CustomizeFormValidateService} from '../service/customize-form.service';

import {LoadingComponent} from './loading/loading.component';
import {MaskComponent} from './mask/mask.component';
import {CenterHeaderComponent} from './center-header/center-header.component';
import {RightEmptyComponent} from './right-empty/right-empty.component';
import {RightHeaderComponent} from './right-header/right-header.component';
import {ConditionFilterComponent} from './condition-filter/condition-filter.component';
import {MainLeftComponent} from './main-left/main-left.component';
import {TabControlComponent} from './tab-control/tab-control.component';
import {SelectButtonGroupComponent} from './select-button-group/select-button-group.component';
import {TagBoxGroupComponent} from './tag-box-group/tag-box-group.component';
import {IconInputComponent} from './icon-input/icon-input.component';
import {PopupWindowDirective} from './popup-window/popup-window.directive';
import {FrontLayerDirective} from './popup-window/front-layer.directive';
import {PopupWindowComponent} from './popup-window/popup-window/popup-window.component';
import {FrontLayerComponent} from './popup-window/front-layer/front-layer.component';
import {PopupWindowBaseComponent} from './popup-window/popup-window-base/popup-window-base.component';
import {DropDownListComponent} from './drop-down-list/drop-down-list.component';
import {RelativeSelectComponent} from './relative-select/relative-select.component';
import {RadioGroupComponent} from './radio-group/radio-group.component';
import {RadioGroupItemComponent} from './radio-group-item/radio-group-item.component';
import {CheckboxGroupComponent} from './checkbox-group/checkbox-group.component';
import {CheckboxGroupItemComponent} from './checkbox-group-item/checkbox-group-item.component';
import {DataEmptyComponent} from './data-empty/data-empty.component';
import {MainRootComponent} from './main-root/main-root.component';
import {PopupConfirmComponent} from './popup-window/popup-confirm/popup-confirm.component';
import {PromptMessageComponent} from './prompt-message/prompt-message.component';
import {RequestOptions, XHRBackend} from '@angular/http';
import { UploadComponent } from './upload/upload.component';
import { ImageCollectionComponent } from './image-collection/image-collection.component';
import {UploadService} from "../service/upload.service";



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CookieModule.forRoot(),
  ],
  declarations: [
    LoadingComponent,
    MaskComponent,
    CenterHeaderComponent,
    RightEmptyComponent,
    RightHeaderComponent,
    ConditionFilterComponent,
    MainLeftComponent,
    TabControlComponent,
    SelectButtonGroupComponent,
    TagBoxGroupComponent,
    IconInputComponent,
    PopupWindowDirective,
    FrontLayerDirective,
    PopupWindowComponent,
    FrontLayerComponent,
    PopupWindowBaseComponent,
    DropDownListComponent,
    RelativeSelectComponent,
    RadioGroupComponent,
    RadioGroupItemComponent,
    CheckboxGroupComponent,
    CheckboxGroupItemComponent,
    DataEmptyComponent,
    MainRootComponent,
    PopupConfirmComponent,
    PromptMessageComponent,
    UploadComponent,
    ImageCollectionComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

    LoadingComponent,
    MaskComponent,
    CenterHeaderComponent,
    RightEmptyComponent,
    RightHeaderComponent,
    ConditionFilterComponent,
    MainLeftComponent,
    TabControlComponent,
    SelectButtonGroupComponent,
    TagBoxGroupComponent,
    IconInputComponent,
    PopupWindowDirective,
    FrontLayerDirective,
    PopupWindowComponent,
    FrontLayerComponent,
    PopupWindowBaseComponent,
    DropDownListComponent,
    RelativeSelectComponent,
    RadioGroupComponent,
    RadioGroupItemComponent,
    CheckboxGroupComponent,
    CheckboxGroupItemComponent,
    DataEmptyComponent,
    MainRootComponent,
    PromptMessageComponent,
    UploadComponent,
    ImageCollectionComponent
  ],
  providers: [
    LocalStorageService,
    ApplicationService,
    HttpInterceptor,
    HttpService,
    {
      provide: InterceptorService,
      useFactory: interceptorFactory,
      deps: [XHRBackend, RequestOptions, HttpInterceptor] // Add it here, in the same order as the signature of interceptorFactory
    },

    CustomizeSliderService,
    CustomizeFormValidateService,

    HomeService,
    UserService,
    MainService,
    PatientService,
    ScheduleService,
    UploadService

  ],
  entryComponents: [
    PopupWindowComponent,
    PopupConfirmComponent
  ]
})
export class CommonComponentModule {
}

export function interceptorFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions, httpInterceptor: HttpInterceptor) {
  const service = new InterceptorService(xhrBackend, requestOptions);
  service.addInterceptor(httpInterceptor); // Add it here
  // Add interceptors here with service.addInterceptor(interceptor)
  return service;
}
