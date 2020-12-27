import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { Observable } from "rxjs";
import { switchMap, tap } from "rxjs/operators";
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

  dateChange($event: Date) {}

  refresh() {
    this.graphService.refresh();
  }
}
