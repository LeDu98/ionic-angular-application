import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {WorkOrdersService} from "../../work-orders.service";
import {WorkOrder} from "../../work-order.model";
import {AlertController, NavController} from "@ionic/angular";

@Component({
  selector: 'app-work-order-details',
  templateUrl: './work-order-details.page.html',
  styleUrls: ['./work-order-details.page.scss'],
})
export class WorkOrderDetailsPage implements OnInit {

  workOrder: WorkOrder;

  constructor(private route: ActivatedRoute, private workOrdersService: WorkOrdersService, private alertCtrl: AlertController,private navCtrl: NavController) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('workOrderId');
    console.log(id);
    this.workOrdersService.workOrders.subscribe((workOrdersList)=>{
        this.workOrder=workOrdersList.find(wo=>wo.id===id);

    });

    console.log(this.workOrder);
  }

  openAlert(){
  this.alertCtrl.create({
    header: 'Delete work order',
    message: 'Are you sure you want to delete this work order?',
    buttons: [
      {
      text: "Delete",
      handler: ()=>{
        console.log('Deleted');

        this.workOrdersService.deleteWorkOrder(this.workOrder.id).subscribe(()=>{
          this.navCtrl.navigateBack('/work-orders/tabs/explore');
        });
      }
    },
      {
        text: "Cancel",
        role: 'cancel',
        handler: ()=>{
          console.log('Canceled');
        }
      }

]
  }).then((alert: HTMLIonAlertElement)=>{
    alert.present();
    });
  }

}
