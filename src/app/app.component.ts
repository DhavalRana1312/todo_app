import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MasterService } from './service/master.service';
import { ApiResponseModel, ITask, Task } from './model/task';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DatePipe, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  //task list 
  taskList: ITask[] = [];

  // Filter 
  filterITaskList: ITask[] = [];
  filterTag = '';
  filterMonth = '';

  constructor() {
    this.filterITaskList = this.taskList;
  }

  //task object
  taskObj: Task = new Task();
  masterService = inject(MasterService);

  //for loop of button
  buttonArray: any[] = ['Tags Group', 'default', 'Hobby', 'Holiday', 'Financial', 'Fun', 'Emergency', 'Health', 'Work', 'Education', 'Social', 'Travel'];

  ngOnInit(): void {
    this.loadAllTask();
  }
  loadAllTask() {
    this.masterService.getAllTaskList().subscribe((res: ApiResponseModel) => {
      this.taskList = res.data;
    })
  }
  addTask() {
    this.masterService.addNewTask(this.taskObj).subscribe(
      (res: ApiResponseModel) => {
        if (res.result) {
          alert("Task created Successfully");
          this.loadAllTask();
          this.taskObj = new Task();
        }
      },
      error => {
        alert('API call error');
      }
    );
  }

  updateTask() {
    this.masterService.updateTask(this.taskObj).subscribe(
      (res: ApiResponseModel) => {
        if (res.result) {
          alert("Task updated Successfully");
          this.loadAllTask();
          this.taskObj = new Task();
        }
      },
      error => {
        alert('API call error');
      }
    );
  }
  onEdit(item: Task) {
    this.taskObj = item;
    setTimeout(() => {
      const dat = new Date(this.taskObj.dueDate);
      const day = ('0' + dat.getDate()).slice(-2);
      const month = ('0' + (dat.getMonth() + 1)).slice(-2);
      const today = dat.getFullYear() + '-' + (month) + '-' + (day);
      //document.getElementById('textDate')['value']=today;

      (<HTMLInputElement>document.getElementById('textDate')).value = today

    }, 1000);//
  }

  onDelete(id: number) {
    const isConfirm = confirm("Are you sure you want to delete..");
    if (isConfirm) {
      this.masterService.deleteTask(id).subscribe(
        (res: ApiResponseModel) => {
          if (res.result) {
            alert("Task Delete Successfully");
            this.loadAllTask();
          }
        },
        error => {
          alert('API call error');
        }
      );
    }
  }

  //onButtonClik
  onClickButton(index: any) {
    console.log("index", index);
    this.buttonArray[index]
    console.log("this.buttonArray[index]", this.buttonArray[index]);
  }


}
