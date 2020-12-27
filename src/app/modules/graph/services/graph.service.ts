import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, Subject } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";
import { ProcessType } from "src/app/share/models/pocess-type";
import { Task } from "src/app/share/models/task";
import { GraphCoreService } from "../core/graph-core.service";

@Injectable()
export class GraphService {
  private _cash: Task[] = [];
  private _tasks$: Observable<Task[]>;
  private _refresh$ = new Subject();

  constructor(private graphCoreService: GraphCoreService) {
    this.init();
  }

  refresh(isCash = false) {
    if (isCash) {
      this._tasks$ = of(this._cash);
    }

    this._refresh$.next();
  }

  getProcessTypes(): Observable<ProcessType[]> {
    return this.graphCoreService.getTypes();
  }

  getTaskObserver(): Observable<Task[]> {
    return this._tasks$;
  }

  getValueTasks(): Task[] {
    return this._cash;
  }

  private init() {
    this._tasks$ = this._refresh$.pipe(
      switchMap(() => this.graphCoreService.getTasks()),
      tap((tasks) => (this._cash = tasks))
    );
  }
}
