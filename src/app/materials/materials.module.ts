import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsRoutingModule } from './materials-routing.module';
import { MaterialsListPageComponent } from './materials-list-page/materials-list-page.component';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '../forms/forms.module';

@NgModule({
  declarations: [MaterialsListPageComponent],
  imports: [
    CommonModule,
    MaterialsRoutingModule,
    ClarityModule,
    FormsModule
  ]
})
export class MaterialsModule { }
