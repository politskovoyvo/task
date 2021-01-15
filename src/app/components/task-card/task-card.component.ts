import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyCoreService } from '@core/services/company-core.service';
import { IAppState } from '@core/stores/app.state';
import { CreateTask, EditTask } from '@core/stores/task/task.actions';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { Base } from '@share/models/base';
import { Task } from '@share/models/task';
import { Observable } from 'rxjs';

enum ESubmitName {
    'CREATE' = 'Cоздать',
    'EDIT' = 'Редактировать',
}

@UntilDestroy()
@Component({
    selector: 'task-card',
    templateUrl: './task-card.component.html',
    styleUrls: ['./task-card.component.scss'],
    providers: [CompanyCoreService],
})
export class CreateCardComponent implements OnInit {
    submitName = ESubmitName;
    assignee$: Observable<Base[]>;
    form: FormGroup;
    action: 'CREATE' | 'EDIT' = 'CREATE';
    inputWidth = '300px';

    constructor(
        private _companyService: CompanyCoreService,
        private _fb: FormBuilder,
        private _taskStore: Store<IAppState>
    ) {
        this.formInit();
    }

    ngOnInit(): void {
        this.assignee$ = this._companyService.getUsers();
    }

    submit() {
        switch (ESubmitName[this.action]) {
            case ESubmitName.CREATE:
                this._taskStore.dispatch(
                    new CreateTask(this.convertFormToTask(this.form))
                );
                break;
            case ESubmitName.EDIT:
                this._taskStore.dispatch(new EditTask(this.convertFormToTask(this.form)));
                break;
        }
    }

    auto() {
        // TODO: функционал автораспределения
    }

    formInit() {
        this.form = this._fb.group({
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
                    stopDate: new Date(new Date().toDateString()),
                },
            ],
        } as Task;
    }
}
