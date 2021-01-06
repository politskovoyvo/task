import { Component, OnInit } from '@angular/core';
import { Task } from '@share/models/task';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {
  taskTypes$: Observable<Task[]>;

  constructor() { }

  ngOnInit(): void {
  }

  getTaskTypes() {

  }
}
