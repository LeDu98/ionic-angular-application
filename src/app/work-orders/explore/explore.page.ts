import { Component, OnInit } from '@angular/core';
import {WorkOrder} from "../work-order.model";
import {MenuController, ModalController} from "@ionic/angular";
import {WorkOrdersService} from "../work-orders.service";
import {WorkOrdersModalComponent} from "../work-orders-modal/work-orders-modal.component";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {


  workOrders: WorkOrder[];
  userId: string;

  constructor(private menuCtrl: MenuController, private workOrdersService: WorkOrdersService,private modalCtrl: ModalController,private authService: AuthService) {
    console.log('proba');
    //this.workOrders=this.workOrdersService.workOrders;
  }

  ngOnInit() {
    this.workOrdersService.workOrders.subscribe((workOrders)=>{
  this.workOrders=workOrders;
    });
    this.authService.userId.subscribe((userId)=>{
      this.userId=userId;
    });
  }
  ionViewWillEnter(){
    this.workOrdersService.getWorkOrders().subscribe((workOrders)=>{
      this.workOrders=workOrders;
    });
  }

  onDelete(id: string){
    console.log('delete');
  }

  openModal(){
    this.modalCtrl
      .create({
      component: WorkOrdersModalComponent
    })
      .then((modal)=>{
      modal.present();
      return modal.onDidDismiss();
    }).then((resultData)=>{
      if(resultData.role==='confirm'){
        console.log(resultData);
        this.workOrdersService.addWorkOrder(resultData.data.workOrderData.title, resultData.data.workOrderData.description)
          .subscribe((res)=>{
          console.log(res);
        });
      }
    });
  }
}
