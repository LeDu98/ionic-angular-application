import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkOrderDetailsPage } from './work-order-details.page';

const routes: Routes = [
  {
    path: '',
    component: WorkOrderDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkOrderDetailsPageRoutingModule {}
