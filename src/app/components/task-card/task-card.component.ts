import { ChangeDetectionStrategy, Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyCoreService } from '@core/services/company-core.service';
import { IAppState } from '@core/stores/app.state';
import { CreateTask, EditTask } from '@core/stores/task/task.actions';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { select, Store } from '@ngrx/store';
import { Base } from '@share/models/base';
import { History, Task } from '@share/models/task';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { Observable } from 'rxjs';
import { BoardCoreService } from '@core/services/board-core.service';
import { filter, tap } from 'rxjs/operators';
import { selectedTask } from '@core/stores/task/task.selectors';

enum ESubmitName {
    'CREATE' = 'Create',
    'EDIT' = 'Edit',
}

@UntilDestroy()
@Component({
    selector: 'task-card',
    templateUrl: './task-card.component.html',
    styleUrls: ['./task-card.component.scss'],
    providers: [CompanyCoreService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskCardComponent implements OnInit {
    submitName = ESubmitName;
    assignee$: Observable<Base[]>;
    states$: Observable<Base[]>;
    form: FormGroup;
    action: 'CREATE' | 'EDIT' = 'CREATE';
    inputWidth = '260px';

    task: Task = {} as Task;

    constructor(
        private _companyService: CompanyCoreService,
        private _fb: FormBuilder,
        private _taskStore: Store<IAppState>,
        private _boardCoreService: BoardCoreService
    ) {}

    ngOnInit(): void {
        this.formInit();

        this._taskStore
            .pipe(
                select(selectedTask),
                filter((_) => !!_),
                tap((task) => {
                    if (!this.form) {
                        return;
                    }
                    this.form?.get('id')?.setValue(task.id);
                    this.form?.get('spendTime')?.setValue(task.spendTime);
                    // id: [this.task.id],
                    //   name: [this.task?.name || '', [Validators.required]],
                    //   spendTime: [
                    //   this.task?.spendTime || '',
                    //   [Validators.pattern(/[[0-9]*[d|h|m]{1}]{0,1}$/), Validators.required],
                    // ],
                    //   type: [this.task?.type || '', [Validators.required]],
                    //   priority: [this.task?.priorityId || 0, [Validators.required]],
                    //   performers: [this.task?.performers || [], [Validators.required]],
                    //   assignee: [this.task?.assignee || ({} as Base), [Validators.required]],
                    //   info: [this.task?.info || '', [Validators.required]],
                    //   state: [undefined, [Validators.required]],
                })
            )
            .subscribe();

        this.assignee$ = this._companyService.getUsers();
        this.states$ = this._boardCoreService
            .getTracks(this._boardCoreService.currentBoard.id)
            .pipe(tap((states) => this.getCurrentState(states)));
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

    addTime() {
        // TODO: функционал автораспределения
    }

    auto() {
        // TODO: функционал автораспределения
    }

    timeSet(htmlElement: HTMLElement) {
        this.checkHTMLElement(htmlElement, 'check');
    }

    private checkHTMLElement(htmlElement: HTMLElement, className: string) {
        if (htmlElement.classList.contains(className)) {
            htmlElement.classList.remove(className);
        } else {
            htmlElement.classList.add(className);
        }
    }

    private getCurrentState(states) {
        const currentHistory = this.task.history?.reduce((acc, history) => {
            return acc?.stopDate > history.stopDate ? acc : history;
        }, undefined);
        const findState = states?.find((s) => s.id === currentHistory?.trackId);
        this.form.get('state').setValue(findState || states.find((s) => s.id === 1));
    }

    private formInit() {
        this.task = { ...this.task };

        this.form = this._fb.group({
            id: [this.task.id],
            name: [this.task?.name || '', [Validators.required]],
            spendTime: [
                this.task?.spendTime || '',
                [Validators.pattern(/[[0-9]*[d|h|m]{1}]{0,1}$/), Validators.required],
            ],
            type: [this.task?.type || '', [Validators.required]],
            priority: [this.task?.priorityId || 0, [Validators.required]],
            performers: [this.task?.performers || [], [Validators.required]],
            assignee: [this.task?.assignee || ({} as Base), [Validators.required]],
            info: [this.task?.info || '', [Validators.required]],
            state: [undefined, [Validators.required]],
        });
    }

    handleChange({ file, fileList }: NzUploadChangeParam): void {
        const status = file.status;
        // if (status !== 'uploading') {
        // }
        // if (status === 'done') {
        // }
    }

    convertSpentTime(str) {
        const dSum = this.getSum(str.match(/\d*d/g), 'd');
        const hSum = this.getSum(str.match(/\d*h/g), 'h');
        const mSum = this.getSum(str.match(/\d*m/g), 'm');

        return `${dSum} ${hSum} ${mSum}`.trim();
    }

    getSum(array, str) {
        if (!array?.length) {
            return '';
        }
        const sum = array.reduce((acc, v) => {
            return acc + +v.replace(str, '');
        }, 0);
        if (!sum) {
            return '';
        }
        return `${sum}${str}`;
    }

    private convertFormToTask(form: FormGroup): Task {
        const {
            id,
            name,
            info,
            type,
            assignee,
            performers,
            priorityId,
            spendTime,
            state,
        } = form.getRawValue();

        const histories = [];
        Object.assign(histories, this.task.history);

        if (this.form.get('state').dirty || !histories.length) {
            histories?.push({
                trackId: state.id,
                startDate: new Date(new Date().toDateString()),
                stopDate: new Date(new Date().toDateString()),
            } as History);
        }

        return {
            id,
            name,
            info,
            type: type || 'type',
            symbol: 'TASK',
            color: '#228B22',
            assignee,
            performers,
            priorityId,
            spendTime: this.convertSpentTime(spendTime),
            history: histories,
        } as Task;
    }
}
