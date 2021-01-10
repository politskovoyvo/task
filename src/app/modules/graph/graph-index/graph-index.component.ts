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
    private graphService: GraphService,
    private boardCoreService: BoardCoreService,
    private drawerService: NzDrawerService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.tasks$ = this.graphService.getTaskObserver().pipe(
      switchMap(
        () => this.boardCoreService.getTracks(),
        (tasks, res) => {
          this.processTypes = res;
          return tasks;
        }
      )
    );

    this.boards$ = this.boardCoreService
      .getBoardsByUserId(this.authService.user.id)
      ?.pipe(
        tap(() => {
          this.board = this.boardCoreService.currentBoard;
        })
      );
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.graphService.refresh());
  }

  createTask() {
    const a = this.drawerService.create({
      nzTitle: 'Создание задания',
      nzWidth: '80%',
      nzContent: CreateTaskComponent
    });
  }

  createBoard() {
    this.drawerService.create({
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
    this.selectedAssigneIds = $event?.map((i) => i.info.assignes)[0].map((ass) => ass.id);
  }

  dateChange($event: Date) {}

  refresh() {
    this.graphService.refresh();
  }
}
