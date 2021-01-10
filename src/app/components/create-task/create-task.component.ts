import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyCoreService } from '@core/services/company-core.service';
import { Base } from '@share/models/base';
import { Task } from '@share/models/task';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
  providers: [CompanyCoreService],
})
export class CreateTaskComponent implements OnInit {
  assignee$: Observable<Base[]>;
  form: FormGroup;

  constructor(private companyService: CompanyCoreService, private fb: FormBuilder) {
    this.formInit();
  }

  ngOnInit(): void {
    this.assignee$ = this.companyService.getUsers();
  }

  submit() {
    console.log('assignee', this.form.get('assignee').value);
    console.log('performers', this.form.get('performers').value);
    console.log('spendTime', this.form.get('spendTime').value);
  }

  auto() {
    // TODO: функционал автораспределения
  }

  formInit() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      spendTime: ['', [Validators.required]],
      type: ['', [Validators.required]],
      priority: ['', [Validators.required]],
      performers: [null, [Validators.required]],
      assignee: ['', [Validators.required]]
    })
  }
}
