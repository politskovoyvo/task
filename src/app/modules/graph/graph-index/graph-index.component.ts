import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';
import { BehaviorSubject, from, Observable, of, Subject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Track } from '@share/models/track';
import { GraphService } from '../services/graph.service';
import { CreateTaskComponent } from '@components/create-task/create-task.component';
import { CreateBoardComponent } from '@components/create-board/create-board.component';
import { BoardCoreService } from '@core/services/board-core.service';
import { Base } from '@share/models/base';
import { Task } from '@share/models/task';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { AuthService } from '@core/auth/services/auth.service';

@Component({
    selector: 'app-graph-index',
    templateUrl: './graph-index.component.html',
    styleUrls: ['./graph-index.component.scss'],
    providers: [GraphService, NzDrawerService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GraphIndexComponent implements OnInit, AfterViewInit {
    boards$: Observable<Base[]>;
    board: Base;
    selectedAssigneIds: number[];
    tasks$: Observable<Task[]>;
    assignes$ = new BehaviorSubject<Base[]>([]);

    processTypes: Track[];

    constructor(
        private _graphService: GraphService,
        private _boardCoreService: BoardCoreService,
        private _drawerService: NzDrawerService,
        private _authService: AuthService
    ) {}

    ngOnInit(): void {
        this.board = this._boardCoreService.currentBoard;

        this.tasks$ = this._graphService.getTaskObserver().pipe(
            switchMap(
                () => this._boardCoreService.getTracks(),
                (tasks, res) => {
                    this.processTypes = res;
                    return tasks;
                }
            )
        );

        this.boards$ = this._boardCoreService.getBoardsObservable();
    }

    ngAfterViewInit(): void {
        setTimeout(() => this._graphService.refresh());
    }

    createTask() {
        this._drawerService.create({
            nzTitle: 'Создание задания',
            nzWidth: '80%',
            nzContent: CreateTaskComponent,
        });
    }

    createBoard() {
        this._drawerService.create({
            nzTitle: 'Создание доски',
            nzWidth: '80%',
            nzContent: CreateBoardComponent,
        });
    }

    lineEmit($event) {
        console.log($event);
    }

    nodeEmit($event) {
        console.log($event);
    }

    lineMouseEnterEmit($event) {
        this.selectedAssigneIds = $event
            ?.map((i) => i.info.assignes)[0]
            .map((ass) => ass.id);
    }

    dateChange($event: Date) {}

    refresh() {
        this._graphService.refresh();
    }
}
