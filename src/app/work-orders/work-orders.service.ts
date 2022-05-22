import { Injectable } from '@angular/core';
import {WorkOrder} from "./work-order.model";

import {HttpClient, HttpClientModule} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {Worker} from "../my-profile/worker.model";
import {map, switchMap, take, tap} from "rxjs/operators";

interface WorkOrderData{
  id: string;
  title: string;
  description: string;
  workerId: string;
}

@Injectable({
  providedIn: 'root'
})
export class WorkOrdersService {

  private url=`https://work-orders-8e95b-default-rtdb.europe-west1.firebasedatabase.app/work-orders`;
  private _workOrders=new BehaviorSubject<WorkOrder[]>([]);
  private worker: Worker;
  private listOfWorkOrders: WorkOrder[];



 /* workOrders: WorkOrder[]=[{id: 'wo1', description: 'work order description 1', worker: 'Marko Mihajlovic'},
    {id: 'wo2', description: 'work order description 2', worker: 'Pera Peric'},
    {id: 'wo3', description: 'work order description 3', worker: 'Ana Anic'},
    {id: 'wo4', description: 'work order description 4', worker: 'Mihajlo Mihajlovic'},
    {id: 'wo5', description: 'work order description 5', worker: 'Marko Markovic'}];
*/
  constructor(private http: HttpClient) { }

  get workOrders(){
    return this._workOrders.asObservable();
  }

  addWorkOrder(workerId: string,title: string, description: string){
    let generatedId

   return this.http.post<{name: string}>(`https://work-orders-8e95b-default-rtdb.europe-west1.firebasedatabase.app/work-orders.json`,{
      workerId,
      title,
      description

    }).pipe(switchMap((resData)=>{
      generatedId=resData.name;
      return this.workOrders;

   }),take(1),tap((workOrders)=>{
     this._workOrders.next(workOrders.concat({
       id: generatedId,
       workerId,
       title,
       description

     }));
   }));
  }

  getWorkOrders(){
    return this.http.get<{[key: string]: WorkOrderData}>(this.url+`.json`)
      .pipe(map((workOrdersData)=>{
        const workOrders: WorkOrder[]=[];

        for(const key in workOrdersData){
          if(workOrdersData.hasOwnProperty(key)){
            workOrders.push({
              id: key,
              workerId: workOrdersData[key].workerId,
              title: workOrdersData[key].title,
              description: workOrdersData[key].description
            });
          }
        }
        this._workOrders.next(workOrders);
        return workOrders;
      }));
  }

  getWorkOrder(id: string):WorkOrder{
   return this.listOfWorkOrders.find(wo=>wo.id===id);
  }

 /* getWorkOrder(id: string){
    return this.workOrders.find((wo)=>wo.id===id);
  }*/
}
