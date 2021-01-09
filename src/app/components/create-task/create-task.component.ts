import { Component, OnInit } from '@angular/core';
import { CompanyCoreService } from '@core/services/company-core.service';
import { Base } from '@share/models/base';
import { Task } from '@share/models/task';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
  providers: [CompanyCoreService]
})
export class CreateTaskComponent implements OnInit {
  assignee$: Observable<Base[]>;

  constructor(private companyService: CompanyCoreService) {}

  ngOnInit(): void {
    this.assignee$ = this.companyService.getUsers();
  }
}
