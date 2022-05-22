import {Component, Input, OnInit} from '@angular/core';
import {WorkOrder} from "../work-order.model";

@Component({
  selector: 'app-work-order-element',
  templateUrl: './work-order-element.component.html',
  styleUrls: ['./work-order-element.component.scss'],
})
export class WorkOrderElementComponent implements OnInit {

  @Input() workOrder: WorkOrder;

  constructor() { }

  ngOnInit() {}

}
