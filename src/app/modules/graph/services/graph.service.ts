import { Injectable } from '@angular/core';
import { BoardCoreService } from '@core/services/board-core.service';
import { TaskCoreService } from '@core/services/task-core.service';
import { Base } from '@share/models/base';
import { Track } from '@share/models/track';
import { Task } from '@share/models/task';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class GraphService {
  private _cash: Task[] = [];
  private _tasks$ = new BehaviorSubject<Task[]>([]);
  private _refresh$ = new Subject();

  constructor(
    private taskCoreService: TaskCoreService,
    private boardCoreService: BoardCoreService
  ) {
    this.init();
  }

  refresh(isCash = false) {
    if (isCash) {
      this._tasks$.next(this._cash);
    }

    this._refresh$.next();
  }

  setTasks(tasks: Task[]) {
    this._tasks$.next(tasks);
  }

  getAssignesObservable(): Observable<Base[]> {
    return this._tasks$.pipe(
      map(
        (tasks: Task[]) =>
          tasks
            ?.map((t) => t.assignee)
            ?.reduce((acc, value) => {
              const ids = acc.map((r) => r.id);
              return acc.concat(
                value.filter((v) => !ids.includes(v.id))
              );
            }, []) || []
      )
    );
  }

  getProcessTypes(): Observable<Track[]> {
    return this.taskCoreService.getTypes();
  }

  getTaskObserver(): Observable<Task[]> {
    return this._tasks$.asObservable();
  }

  getValueTasks(): Task[] {
    return this._tasks$.value;
  }

  private init() {
    this._refresh$
      .pipe(
        switchMap(() =>
          this.taskCoreService.getTasks(
            this.boardCoreService.currentBoard.id
          )
        ),
        tap((tasks) => (this._cash = tasks))
      )
      .subscribe(this._tasks$);
  }
}
