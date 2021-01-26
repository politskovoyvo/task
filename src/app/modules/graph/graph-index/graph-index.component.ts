import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Track } from '@share/models/track';
import { TaskCardComponent } from '@components/task-card/task-card.component';
import { CreateBoardComponent } from '@components/create-board/create-board.component';
import { BoardCoreService } from '@core/services/board-core.service';
import { Base } from '@share/models/base';
import { Task } from '@share/models/task';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { select, Store } from '@ngrx/store';
import { IAppState } from '@core/stores/app.state';
import { selectedTasks } from '@core/stores/task/task.selectors';
import { GetTasks } from '@core/stores/task/task.actions';

@Component({
    selector: 'app-graph-index',
    templateUrl: './graph-index.component.html',
    styleUrls: ['./graph-index.component.scss'],
    providers: [NzDrawerService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GraphIndexComponent implements OnInit, AfterViewInit {
    boards$: Observable<Base[]>;
    tasks$: Observable<Task[]>;
    assignes$ = new BehaviorSubject<Base[]>([]);
    selectedAssigneIds: number[];
    board: Base;
    processTypes: Track[];

    taskStore$ = this._taskStore.pipe(select(selectedTasks));

    constructor(
        private _boardCoreService: BoardCoreService,
        private _drawerService: NzDrawerService,
        private _taskStore: Store<IAppState>
    ) {}

    ngOnInit(): void {
        this.board = this._boardCoreService.currentBoard;
        this.boards$ = this._boardCoreService.getBoardsObservable();

        this.tasks$ = this.taskStore$.pipe(
            switchMap(
                () => this._boardCoreService.getTracks(),
                (tasks, res) => {
                    this.processTypes = res;
                    return tasks;
                }
            )
        );
    }

    ngAfterViewInit(): void {
        setTimeout(() => this._taskStore.dispatch(new GetTasks()));
    }

    changeBoard(board: Base) {
        this._boardCoreService.setLocalBoard(board);
    }

    createTask() {
        this._drawerService.create({
            nzTitle: 'Создание задания',
            nzWidth: '80%',
            nzContent: TaskCardComponent,
        });
    }

    createBoard() {
        this._drawerService.create({
            nzTitle: 'Создание доски',
            nzWidth: '80%',
            nzContent: CreateBoardComponent,
        });
    }

    dateChange($event: Date) {}

    refresh() {}
}
