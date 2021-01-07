import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Track } from '@share/models/track';
import { GraphService } from '../services/graph.service';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { CreateTaskComponent } from 'src/app/components/create-task/create-task.component';
import { BoardCoreService } from '@core/services/board-core.service';
import { Base } from '@share/models/base';
import { Task } from '@share/models/task';

@Component({
  selector: 'app-graph-index',
  templateUrl: './graph-index.component.html',
  styleUrls: ['./graph-index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [GraphService, NzModalModule],
})
export class GraphIndexComponent implements OnInit, AfterViewInit {
  tasks$: Observable<Task[]>;
  // assignes$: Observable<Base[]>;
  assignes$ = new BehaviorSubject<Base[]>([]);
  processTypes: Track[];

  constructor(
    private graphService: GraphService,
    private boardCoreService: BoardCoreService,
    private change: ChangeDetectorRef,
    private modalService: NzModalService
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

    this.graphService
      .getAssignesObservable()
      .subscribe(this.assignes$);
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.graphService.refresh());
  }

  createTask() {
    this.modalService.create({
      nzContent: CreateTaskComponent
    });
  }

  createBoard() {
    this.modalService.create({
      nzContent: CreateTaskComponent
    });
  }

  lineEmit($event) {
    console.log($event);
  }

  nodeEmit($event) {
    console.log($event);
  }

  lineMouseEnterEmit($event) {
    const ids: number[] = $event
      .map((i) => i.info.assignes)[0]
      .map((ass) => ass.id);
    const assignes = this.assignes$.value?.map((assigne) => {
      assigne['isSelected'] = ids.includes(assigne.id);
      return assigne;
    });
    this.assignes$.next(assignes);

    // console.log(ids.unique())
    // this.assignes$ = this.assignes$.pipe(
    //   map(a => {

    //     return a;
    //   })
    // )
  }

  dateChange($event: Date) {}

  refresh() {
    this.graphService.refresh();
  }
}
