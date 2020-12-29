import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { BehaviorSubject, Observable, of, Subject } from "rxjs";
import { map, switchMap, tap, withLatestFrom } from "rxjs/operators";
import { Base } from "src/app/share/models/base";
import { ProcessType } from "src/app/share/models/pocess-type";
import { Task } from "src/app/share/models/task";
import { GraphService } from "../services/graph.service";

@Component({
  selector: "app-graph-index",
  templateUrl: "./graph-index.component.html",
  styleUrls: ["./graph-index.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [GraphService],
})
export class GraphIndexComponent implements OnInit, AfterViewInit {
  tasks$: Observable<Task[]>;
  // assignes$: Observable<Base[]>; 
  assignes$ = new BehaviorSubject<Base[]>([]); 
  processTypes: ProcessType[];

  constructor(private graphService: GraphService, private change: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.tasks$ = this.graphService.getTaskObserver().pipe(
      switchMap(
        () => this.graphService.getProcessTypes(),
        (tasks, res) => {
          this.processTypes = res;
          return tasks;
        }
      )
    );

    this.graphService.getAssignesObservable().subscribe(this.assignes$);
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.graphService.refresh());
  }

  lineEmit($event) {
    console.log($event)
  }

  nodeEmit($event) {
    console.log($event)
  }

  lineMouseEnterEmit($event) {
    const ids: number[] = $event.map(i => i.info.assignes)[0].map(ass => ass.id);
    const assignes = this.assignes$.value?.map(assigne => {
      assigne['isSelected'] = ids.includes(assigne.id);
      return assigne;
    });
    this.assignes$.next(assignes)
    


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
