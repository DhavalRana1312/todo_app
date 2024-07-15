import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ObjectUnsubscribedError, Observable } from 'rxjs';
import { ApiResponseModel } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  apiUrl : string="https://freeapi.gerasim.in/api/JWT/";

  constructor(private http: HttpClient) {}
    getAllTaskList() : Observable<ApiResponseModel>{
      return this.http.get<ApiResponseModel>(this.apiUrl+'GetAllTaskList');
    }

    addNewTask(taskObj: any): Observable<ApiResponseModel> {
      return this.http.post<ApiResponseModel>(this.apiUrl + 'CreateNewTask', taskObj);
    }

    updateTask(taskObj: any): Observable<ApiResponseModel> {
      return this.http.put<ApiResponseModel>(this.apiUrl + 'UpdateTask', taskObj);
    }

    deleteTask(id: number): Observable<ApiResponseModel> {
      return this.http.delete<ApiResponseModel>(this.apiUrl + 'DeleteTask?itemId='+id);
    } 

    
}
