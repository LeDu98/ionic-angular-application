import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExplorePageRoutingModule } from './explore-routing.module';

import { ExplorePage } from './explore.page';
import {WorkOrderElementComponent} from "../work-order-element/work-order-element.component";
import {WorkOrdersModalComponent} from "../work-orders-modal/work-orders-modal.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExplorePageRoutingModule
  ],
  declarations: [ExplorePage, WorkOrderElementComponent, WorkOrdersModalComponent ],
  entryComponents: [WorkOrdersModalComponent]
})
export class ExplorePageModule {}
