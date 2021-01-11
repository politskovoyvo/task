import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BoardCoreService } from '@core/services/board-core.service';
import { CompanyCoreService } from '@core/services/company-core.service';
import { TaskCoreService } from '@core/services/task-core.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Base } from '@share/models/base';
import { Task } from '@share/models/task';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
  providers: [CompanyCoreService],
})
export class CreateTaskComponent implements OnInit {
  assignee$: Observable<Base[]>;
  form: FormGroup;
  inputWidth = '300px';

  constructor(
    private companyService: CompanyCoreService,
    private fb: FormBuilder,
    private taskCoreService: TaskCoreService,
    private boardCoreService: BoardCoreService
  ) {
    this.formInit();
  }

  ngOnInit(): void {
    this.assignee$ = this.companyService.getUsers();
  }

  submit() {
    const newTask = this.convertFormToTask(this.form);
    this.taskCoreService
      .createTask(this.boardCoreService.currentBoard.id, newTask)
      .pipe(
        untilDestroyed(this)
      )
      .subscribe();
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
      assignee: ['', [Validators.required]],
      info: ['', [Validators.required]],
    });
  }

  private convertFormToTask(form: FormGroup): Task {
    const newTask = form.getRawValue();
    return {
      id: 10,
      type: 'type',
      simbol: 'TASK',
      color: '#228B22',
      assignee: newTask.assignee,
      priorityId: newTask.priority?.id,
      spendTime: +newTask.spendTime,
      history: [
        {
          // чтобы появилась точка создания
          trackId: 1,
          startDate: new Date(new Date().toDateString()),
          stopDate:  new Date(new Date().toDateString()),
        },
      ],
    } as Task;
  }
}
