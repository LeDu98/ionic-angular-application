import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-work-orders-modal',
  templateUrl: './work-orders-modal.component.html',
  styleUrls: ['./work-orders-modal.component.scss'],
})
export class WorkOrdersModalComponent implements OnInit {

  @ViewChild('f',{static: true}) form: NgForm;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  onCancel(){
    this.modalCtrl.dismiss(null,'cancel');
  }

  onAddWorkOrder(){
  if(!this.form.valid){
    return;
  }
  this.modalCtrl.dismiss({workOrderData: {
    title: this.form.value['title'],
      description: this.form.value['description'],

  }},
    'confirm');
  }
}
