import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaterialsListPageComponent } from './materials-list-page/materials-list-page.component';


const routes: Routes = [
  {
    path: '',
    component: MaterialsListPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaterialsRoutingModule { }
