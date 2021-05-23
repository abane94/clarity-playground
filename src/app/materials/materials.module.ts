import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsRoutingModule } from './materials-routing.module';
import { MaterialsListPageComponent } from './materials-list-page/materials-list-page.component';


@NgModule({
  declarations: [MaterialsListPageComponent],
  imports: [
    CommonModule,
    MaterialsRoutingModule
  ]
})
export class MaterialsModule { }
