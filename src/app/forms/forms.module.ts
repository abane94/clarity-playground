import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDefinedFormViewerComponent } from './user-defined-form-viewer/user-defined-form-viewer.component';
import { FormsModule as ngFormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { ListItemModalContainerComponent } from './list-item-modal-container/list-item-modal-container.component';
import { MasterDetailControlComponent } from './master-detail-control/master-detail-control.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialEditorComponent } from './material-editor/material-editor.component';
import { NamedTemplateDirective } from './named-template/named-template.directive';
import { UserDefinedFormDataDisplayComponent } from './user-defined-form-data-display/user-defined-form-data-display.component';



@NgModule({
  declarations: [UserDefinedFormViewerComponent, ListItemModalContainerComponent, MasterDetailControlComponent, MaterialEditorComponent, NamedTemplateDirective, UserDefinedFormDataDisplayComponent],
  imports: [
    CommonModule,
    ClarityModule,
    ngFormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA // Tells Angular we will have custom tags in our templates
  ],
  exports: [UserDefinedFormViewerComponent, ListItemModalContainerComponent, MasterDetailControlComponent, MaterialEditorComponent, NamedTemplateDirective, UserDefinedFormDataDisplayComponent]
})
export class FormsModule { }
