/**
 * Created by KingKong on 2017/6/8.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {LoadingComponent} from './loading/loading.component';
import {MaskComponent} from './mask/mask.component';
import {CenterHeaderComponent} from './center-header/center-header.component';
import {RightEmptyComponent} from './right-empty/right-empty.component';
import {RightHeaderComponent} from './right-header/right-header.component';
import {ConditionFilterComponent} from './condition-filter/condition-filter.component';
import {LeftContentComponent} from './left-content/left-content.component';
import {TabControlComponent} from './tab-control/tab-control.component';
import {SelectButtonGroupComponent} from './select-button-group/select-button-group.component';
import {TagBoxGroupComponent} from './tag-box-group/tag-box-group.component';
import {IconInputComponent} from './icon-input/icon-input.component';
import {PopupWindowDirective} from './popup-window/popup-window.directive';
import {FrontLayerDirective} from './popup-window/front-layer.directive';
import {PopupWindowComponent} from './popup-window/popup-window/popup-window.component';
import {FrontLayerComponent} from './popup-window/front-layer/front-layer.component';
import {PopupWindowBaseComponent} from './popup-window/popup-window-base/popup-window-base.component';
import {PopupValidateFormWindowBaseComponent} from './popup-window/popup-window-base/popup-form-window-base.component';
import {DropDownListComponent} from './drop-down-list/drop-down-list.component';
import {RelativeSelectComponent} from './relative-select/relative-select.component';
import {RadioGroupComponent} from './radio-group/radio-group.component';
import {RadioGroupItemComponent} from './radio-group-item/radio-group-item.component';
import {CheckboxGroupComponent} from './checkbox-group/checkbox-group.component';
import {CheckboxGroupItemComponent} from './checkbox-group-item/checkbox-group-item.component';
import {DataEmptyComponent} from './data-empty/data-empty.component';
import {MainRootComponent} from './main-root/main-root.component';
import {ApplicationService} from '../service/application.service';
import {CustomizeFormComponent} from './customize-form/customize-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  declarations: [
    CustomizeFormComponent,
    LoadingComponent,
    MaskComponent,
    CenterHeaderComponent,
    RightEmptyComponent,
    RightHeaderComponent,
    ConditionFilterComponent,
    LeftContentComponent,
    TabControlComponent,
    SelectButtonGroupComponent,
    TagBoxGroupComponent,
    IconInputComponent,
    PopupWindowDirective,
    FrontLayerDirective,
    PopupWindowComponent,
    FrontLayerComponent,
    PopupWindowBaseComponent,
    PopupValidateFormWindowBaseComponent,
    DropDownListComponent,
    RelativeSelectComponent,
    RadioGroupComponent,
    RadioGroupItemComponent,
    CheckboxGroupComponent,
    CheckboxGroupItemComponent,
    DataEmptyComponent,
    MainRootComponent
  ],
  exports: [
    CustomizeFormComponent,
    LoadingComponent,
    MaskComponent,
    CenterHeaderComponent,
    RightEmptyComponent,
    RightHeaderComponent,
    ConditionFilterComponent,
    LeftContentComponent,
    TabControlComponent,
    SelectButtonGroupComponent,
    TagBoxGroupComponent,
    IconInputComponent,
    PopupWindowDirective,
    FrontLayerDirective,
    PopupWindowComponent,
    FrontLayerComponent,
    PopupWindowBaseComponent,
    PopupValidateFormWindowBaseComponent,
    DropDownListComponent,
    RelativeSelectComponent,
    RadioGroupComponent,
    RadioGroupItemComponent,
    CheckboxGroupComponent,
    CheckboxGroupItemComponent,
    DataEmptyComponent,
    MainRootComponent
  ],
  providers: [
    ApplicationService
  ],
  entryComponents: [
    PopupWindowComponent
  ]
})
export class CommonComponentModule {
}
