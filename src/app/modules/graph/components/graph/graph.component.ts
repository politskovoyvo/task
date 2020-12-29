import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import * as d3 from "d3";
import { ProcessType } from "src/app/share/models/pocess-type";
import { Task } from "src/app/share/models/task";
import { LineOptions } from "../../models/line-options";
import { GraphService } from "../../services/graph.service";

const Node = d3.hierarchy.prototype.constructor;
type TODO_NODE = any;
type TODO_SVG = any;
const step = 20;

@Component({
  selector: "app-graph",
  templateUrl: "./graph.component.html",
  styleUrls: ["./graph.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GraphComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild("canvas") canvas: ElementRef;
  @Input() tasks: Task[];
  @Input() processTypes: ProcessType[];
  @Output() nodeEmit = new EventEmitter();
  @Output() lineEmit = new EventEmitter();
  @Output() lineMouseEnterEmit = new EventEmitter();

  nowDate = new Date();

  constructor(private change: ChangeDetectorRef) {}
  ngAfterViewInit(): void {
    this.change.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.tasks?.length && changes.tasks && this.processTypes) {
      this.paintGrid(this.tasks, this.processTypes);
    }
  }

  ngOnInit(): void {}

  private paintGrid = (tasks: Task[], processTypes: ProcessType[]) => {
    const width = 400,
      height = 1000,
      margin = { top: 20, bottom: 20, left: 20, right: 20 };
    const svg = d3
      .select(this.canvas.nativeElement)
      .append("svg")
      .attr("height", height)
      .attr("width", width)
      .attr("viewBox", <any>[-10, -100, width, height]);
    this.grid(processTypes, tasks, svg);
  };

  private grid = (
    processTypes: ProcessType[],
    tasks: Task[],
    svg: TODO_SVG
  ) => {
    const daysInSelectedMonth = this.nowDate.daysInMonth();
    let processTypeGroup: number[] = [];
    let group: {
      type: number;
      color: string;
      ids: number[];
    }[] = [];

    tasks.forEach((task: Task) => {
      task.history.forEach((history, ind) => {
        let findType = group.find((g) => g.type && g.type === history.position);
        if (findType) {
          if (findType.ids.includes(task.id)) {
            return;
          }
          findType.ids.push(task.id);
        } else {
          group.push({
            type: history.position,
            ids: [task.id],
            color:
              processTypes.find((pc) => pc.id === history.position)?.color ||
              "",
          });
        }
      });
    });

    let countGroupType = group.reduce((acc, curr) => {
      return acc + curr.ids.length;
    }, 0);

    // последовательность типов
    group = group.sort((a, b) => a.type - b.type);

    // vertical grid
    let step_x = 0;
    group.forEach((type, index) => {
      type.ids = type.ids.sort();
      step_x = !index ? 0 : group[index - 1].ids.length * step + step_x;
      svg
        .selectAll("vertical__line")
        .data(new Array(type.ids.length + 1))
        .enter()
        .append("line")
        .attr("x1", (d, ind) => step_x + ind * step)
        .attr("y1", 0)
        .attr("x2", (d, ind) => step_x + ind * step)
        .attr("y2", "100%")
        .attr("class", "vertical__line")
        .style("fill", "none")
        .style("stroke", (d, ind) =>
          type.ids.length === ind ? "green" : "black"
        )
        .style("stroke-dasharray", "20, 4")
        .style("troke-dashoffset", 0)
        .style("opacity", 0.3)
        .style("stroke-width", (d, ind) => (type.ids.length === ind ? 1 : 0.2));

      svg
        .selectAll("task__name")
        .data(new Array(type.ids.length))
        .enter()
        .append("foreignObject")
        .attr("class", "task__name")
        .style("y", (d, ind) => step_x + ind * step)
        .style("x", () => 0)
        .style("width", 100)
        .style("height", step)
        .html((d, i) => {
          const typeId = type.ids[i];
          return tasks.find((t) => t.id === typeId)?.simbol || "";
        });

      svg
        .append("foreignObject")
        .attr("class", "type__name")
        .style("y", () => 0)
        .style("zIndex", -5)
        .style("x", () => step_x)
        .style("width", () => step * type.ids.length)
        .style("height", "100%")
        .style("background", () => type.color);
    });

    // horizontal grid
    let horizontLines = svg
      .selectAll("horizontal__line")
      .data(new Array(daysInSelectedMonth))
      .enter()
      .append("line")
      .attr("x1", 0)
      .attr("y1", (d, ind) => ind * step)
      .attr("class", "horizontal__line")
      .attr("x2", step * countGroupType + 10)
      .attr("y2", (d, ind) => ind * step)
      .style("fill", "none")
      .style("stroke", "black")
      .style("stroke-dasharray", "10, 4")
      .style("stroke-width", 0.15);

    svg
      .selectAll("barsEndlineText")
      .data(new Array(daysInSelectedMonth + 1))
      .enter()
      .append("text")
      .attr("class", "barsEndlineText")
      .attr(
        "x",
        () => group.reduce((acc, val) => acc + val.ids.length * step, 0) + 15
      )
      .attr("y", (d, ind) => ind * step + 3)
      .text((d, i) => i);

    // paint Tasks
    tasks.forEach((task, ind) => {
      this.paintTask(svg, task, group, {
        lineColor: task.color,
        nodeColor: "black",
        nodeRadius: "4",
        strokeWidth: "3",
      } as LineOptions);
    });
  };

  private paintTask = (
    svg: TODO_SVG,
    task: Task,
    group: {
      type: number;
      ids: number[];
    }[],
    options: LineOptions
  ): void => {
    const data: any[] = [];
    task.history.forEach((history) => {
      let marginLeft = 0;
      let position = group.find((h) => {
        const isFindIndex = h.type === history.position;
        if (!isFindIndex) {
          marginLeft += h.ids.length * step;
        }
        return isFindIndex;
      });

      if (!position) {
        return;
      }
      // на всякий случай
      position.ids = position.ids.sort();

      const h_x = marginLeft + position.ids.indexOf(task.id) * step + step / 2;
      data.push({
        point: {
          x: h_x,
          y: history.startDate.getDate() * step,
        } as Point,
        info: {
          id: task.id,
          date: history.startDate,
          assignes: task.assignee
        } as SelectedNodeInfo,
      });

      data.push({
        point: {
          x: h_x,
          y: history.stopDate.getDate() * step,
        } as Point,
        info: {
          id: task.id,
          date: history.stopDate,
          assignes: task.assignee
        } as SelectedNodeInfo,
      });
    });

    const line = d3
      .line()
      .x((d: any) => d.point.x)
      .y((d: any) => d.point.y)
      .curve(d3.curveMonotoneX);

    let path = svg
      .append("path")
      .attr("class", "path-task")
      .style("stroke", options.lineColor)
      .attr("d", line(data as any[]))
      .on("click", (e) => {
        this.lineEmit.emit(data);
      })
      .on('mouseenter', (e) => {
        this.lineMouseEnterEmit.emit(data)
      });

    data.forEach((element) => {
      let node = svg
        .append("circle")
        .attr("class", "node")
        .attr("r", options.nodeRadius)
        .attr("cx", element.point.x)
        .attr("cy", element.point.y)
        .on("click", (e) => {
          this.nodeEmit.emit(node);
          console.log(node);
        });

      node["data"] = element.info;
    });
  };

  getRandomColor = () => {
    let letters = "0123456789ABCDEF";
    let color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
}

export interface SelectedNodeInfo {
  id: number;
  date: Date;
  assignes: [];
}
// ДАЛЕЕ
// формат который я буду здесь принимать
export interface Point {
  x: number;
  y: number;
}

type taskFormat = {
  coord: Point;
  nodes: [];
};
// ...
