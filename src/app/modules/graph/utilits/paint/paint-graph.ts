import {
  ElementRef,
  EventEmitter
} from "@angular/core";
import * as d3 from "d3";
import { ProcessType } from "src/app/share/models/pocess-type";
import { Task } from "src/app/share/models/task";
import { LineOptions } from "../../models/line-options";
import { Point } from "./models/point";

export interface SelectedNodeInfo {
  id: number;
  date: Date;
}

type TODO_SVG = any;
const _STEP = 20;
let _date: Date;

const paintGrid = (
  elRef: ElementRef,
  date: Date,
  tasks: Task[],
  processTypes: ProcessType[]
) => {
  _date = date;

  const width = 400,
    height = 1000,
    margin = { top: 20, bottom: 20, left: 20, right: 20 };

  const svg = d3
    .select(elRef.nativeElement)
    .append("svg")
    .attr("height", height)
    .attr("width", width)
    .attr("viewBox", <any>[-10, -100, width, height]);
  grid(processTypes, tasks, svg);
};

const grid = (processTypes: ProcessType[], tasks: Task[], svg: TODO_SVG) => {
  const daysInSelectedMonth = _date.daysInMonth();
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
            processTypes.find((pc) => pc.id === history.position)?.color || "",
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
    step_x = !index ? 0 : group[index - 1].ids.length * _STEP + step_x;
    svg
      .selectAll("vertical__line")
      .data(new Array(type.ids.length + 1))
      .enter()
      .append("line")
      .attr("x1", (d, ind) => step_x + ind * _STEP)
      .attr("y1", 0)
      .attr("x2", (d, ind) => step_x + ind * _STEP)
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
      .style("y", (d, ind) => step_x + ind * _STEP)
      .style("x", () => 0)
      .style("width", 100)
      .style("height", _STEP)
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
      .style("width", () => _STEP * type.ids.length)
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
    .attr("y1", (d, ind) => ind * _STEP)
    .attr("class", "horizontal__line")
    .attr("x2", _STEP * countGroupType + 10)
    .attr("y2", (d, ind) => ind * _STEP)
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
      () => group.reduce((acc, val) => acc + val.ids.length * _STEP, 0) + 15
    )
    .attr("y", (d, ind) => ind * _STEP + 3)
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

const paintTask = (
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
        marginLeft += h.ids.length * _STEP;
      }
      return isFindIndex;
    });

    if (!position) {
      return;
    }
    // на всякий случай
    position.ids = position.ids.sort();

    const h_x = marginLeft + position.ids.indexOf(task.id) * _STEP + _STEP / 2;
    data.push({
      point: {
        x: h_x,
        y: history.startDate.getDate() * _STEP,
      } as Point,
      info: {
        id: task.id,
        date: history.startDate,
      } as SelectedNodeInfo,
    });

    data.push({
      point: {
        x: h_x,
        y: history.stopDate.getDate() * _STEP,
      } as Point,
      info: {
        id: task.id,
        date: history.stopDate,
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
      lineEmit.emit(data);
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

const getRandomColor = () => {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export { paintGrid };
