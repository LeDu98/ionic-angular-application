import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkOrderDetailsPageRoutingModule } from './work-order-details-routing.module';

import { WorkOrderDetailsPage } from './work-order-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkOrderDetailsPageRoutingModule
  ],
  declarations: [WorkOrderDetailsPage]
})
export class WorkOrderDetailsPageModule {}
