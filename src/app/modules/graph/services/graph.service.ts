import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, Subject } from "rxjs";
import { map } from 'rxjs/operators';
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

    getTaskObserver() {
        return this._tasks$;
    }

    getTasks() {
        return this.graphCoreService.getTasks();
    }

    init() {
        this._refresh$.pipe(
            map(() => this.graphCoreService.getTasks())
        ).subscribe(this._refresh$);
    }
}
