import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, Subject } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";
import { Base } from "src/app/share/models/base";
import { ProcessType } from "src/app/share/models/pocess-type";
import { Task } from "src/app/share/models/task";
import { GraphCoreService } from "../core/graph-core.service";

@Injectable()
export class GraphService {
  private _cash: Task[] = [];
  private _tasks$ = new BehaviorSubject<Task[]>([]);
  private _refresh$ = new Subject();

  constructor(private graphCoreService: GraphCoreService) {
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
      map((tasks: Task[]) =>
        tasks
          ?.map((t) => t.assignee)
          ?.reduce((acc, value) => {
            const ids = acc.map((r) => r.id);
            return acc.concat(value.filter((v) => !ids.includes(v.id)));
          }, []) || []
      )
    );
  }

  getProcessTypes(): Observable<ProcessType[]> {
    return this.graphCoreService.getTypes();
  }

  getTaskObserver(): Observable<Task[]> {
    return this._tasks$.asObservable();
  }

  getValueTasks(): Task[] {
    return this._tasks$.value;
  }

  private init() {
    this._refresh$.pipe(
      switchMap(() => this.graphCoreService.getTasks()),
      tap((tasks) => (this._cash = tasks))
    ).subscribe(this._tasks$);
  }
}
