import { Injectable } from '@angular/core';
import {WorkOrder} from "./work-order.model";

import {HttpClient, HttpClientModule} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";

import {map, switchMap, take, tap} from "rxjs/operators";
import {AuthService} from "../auth/auth.service";

interface WorkOrderData{
  title: string;
  description: string;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class WorkOrdersService {

  private url=`https://work-orders-8e95b-default-rtdb.europe-west1.firebasedatabase.app/work-orders`;
  private _workOrders=new BehaviorSubject<WorkOrder[]>([]);
  private listOfWorkOrders: WorkOrder[];



 /* workOrders: WorkOrder[]=[{id: 'wo1', description: 'work order description 1', worker: 'Marko Mihajlovic'},
    {id: 'wo2', description: 'work order description 2', worker: 'Pera Peric'},
    {id: 'wo3', description: 'work order description 3', worker: 'Ana Anic'},
    {id: 'wo4', description: 'work order description 4', worker: 'Mihajlo Mihajlovic'},
    {id: 'wo5', description: 'work order description 5', worker: 'Marko Markovic'}];
*/
  constructor(private http: HttpClient, private authService: AuthService) { }

  get workOrders(){
    return this._workOrders.asObservable();
  }

  addWorkOrder(title: string, description: string){
    let generatedId;
    let newWorkOrder: WorkOrder;

    return this.authService.userId.pipe(
      take(1),switchMap(userId=>{
    newWorkOrder=new WorkOrder(
      null,
      title,
      description,
      userId);
        return this.http.post<{name: string}>(`https://work-orders-8e95b-default-rtdb.europe-west1.firebasedatabase.app/work-orders.json`,newWorkOrder);
      }),
      take(1),
      switchMap((resData)=>{
        generatedId=resData.name;
        return this.workOrders;

      }),
      take(1),tap(

        (workOrders)=> {
          newWorkOrder.id = generatedId;
          this._workOrders.next(workOrders.concat(newWorkOrder));
        }));

  }

  getWorkOrders(){

    return this.http.get<{[key: string]: WorkOrderData}>(this.url+`.json`)
      .pipe(map((workOrdersData)=>{
        const workOrders: WorkOrder[]=[];

        for(const key in workOrdersData){
          if(workOrdersData.hasOwnProperty(key)){
            workOrders.push(new WorkOrder(key,workOrdersData[key].title,workOrdersData[key].description,workOrdersData[key].userId));
          }
        }
        this._workOrders.next(workOrders);
        return workOrders;
      }));
  }

  deleteWorkOrder(id: string){


    console.log(id);
    return this.http.delete(`https://work-orders-8e95b-default-rtdb.europe-west1.firebasedatabase.app/work-orders/` + id + `.json`);
  }

  getWorkOrder(id: string): WorkOrder{
   return this.listOfWorkOrders.find(wo=>wo.id===id);
  }

 /* getWorkOrder(id: string){
    return this.workOrders.find((wo)=>wo.id===id);
  }*/
}
