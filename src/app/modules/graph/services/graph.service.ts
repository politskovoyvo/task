import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, Subject } from "rxjs";
import { map } from 'rxjs/operators';
import { ProcessType } from 'src/app/share/models/pocess-type';
import { Task } from 'src/app/share/models/task';
import { GraphCoreService } from '../core/graph-core.service';

@Injectable()
export class GraphService {
    private _tasks$ = new BehaviorSubject<Task[]>([]);
    private _refresh$ = new Subject();

    constructor(private graphCoreService: GraphCoreService) {}

    refresh() {
        this._refresh$.next();
    }

    getProcessTypes(): Observable<ProcessType[]> {
        return this.graphCoreService.getTypes();
    }

    getTaskObserver(): Observable<Task[]> {
        return this._tasks$;
    }

    getTasks() : Observable<Task[]> {
        return this.graphCoreService.getTasks();
    }

    private init() {
        this._refresh$.pipe(
            map(() => this.graphCoreService.getTasks())
        ).subscribe(this._refresh$);
    }
}
