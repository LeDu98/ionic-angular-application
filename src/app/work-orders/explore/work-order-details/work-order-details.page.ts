import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {WorkOrdersService} from "../../work-orders.service";
import {WorkOrder} from "../../work-order.model";

@Component({
  selector: 'app-work-order-details',
  templateUrl: './work-order-details.page.html',
  styleUrls: ['./work-order-details.page.scss'],
})
export class WorkOrderDetailsPage implements OnInit {

  workOrder: WorkOrder;

  constructor(private route: ActivatedRoute, private workOrdersService: WorkOrdersService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('workOrderId');
    console.log(id);
    this.workOrder = this.workOrdersService.getWorkOrder(id);
    console.log(this.workOrder);
  }

}
