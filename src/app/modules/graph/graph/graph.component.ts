import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as d3 from "d3";
import { color } from 'd3';
import { Observable, pipe } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ProcessType } from 'src/app/share/models/pocess-type';
// import * as d3 from 'd3-selection';
import { Task } from 'src/app/share/models/task';
import { LineOptions } from '../models/line-options';
import { GraphService } from '../services/graph.service';

const Node = d3.hierarchy.prototype.constructor;
type TODO_NODE = any;
type TODO_SVG = any;


@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas') canvas: ElementRef;
  tasks$: Observable<Task[]>;

  nowDate = new Date();

  constructor(private graphService: GraphService) { }

  ngAfterViewInit(): void {
    this.graphService.getTasks()
    .pipe(
      switchMap(() => this.graphService.getProcessTypes(), (t, r) => [t, r]),
      tap(([tasks, processTypes]: [Task[], ProcessType[]]) => {
        this.paintGrid(tasks, processTypes);
      })
    ).subscribe();
  }

  ngOnInit(): void { }

  refresh() {
    this.graphService.refresh();
  }

  dateChange(date: Date): void {
    console.log('date change')
  }

  private paintGrid = (
    tasks: Task[], 
    processTypes: ProcessType[]
    ) => {
    const width = 400,
          height = 1000,
          margin = { top: 20, bottom: 20, left: 20, right: 20 };

    const svg = d3.select(this.canvas.nativeElement)
      .append('svg')
        .attr("height", height)
        .attr("width", width);   

    this.grid(processTypes, tasks, svg);

    tasks.forEach((task, ind) => {
      this.paintTask(svg, task, {
        lineColor: 'red',
        nodeColor: 'black',
        nodeRadius: '5',
        strokeWidth: '4'
      } as LineOptions);
    })
  }

  private grid = (
    processTypes: ProcessType[], 
    tasks: Task[], 
    svg: TODO_SVG
    ) => {
      const step = 20;
      const daysInSelectedMonth = this.nowDate.daysInMonth();
      let processTypeGroup: number[] = [];
      let group: {
        type: number,
        ids: number[]
      }[] = [];

      tasks.forEach((task: Task) => {
        task.history.forEach((history, ind) => {
          let findType = group.find(g => g.type && g.type === history.position);
          if (findType) {
            if (findType.ids.includes(task.id)) {
              return;
            }
            findType.ids.push(task.id);
          } else {
            group.push({
              type: history.position,
              ids: [task.id]
            })
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
      group.forEach((type, i) => {
        step_x = !i ? 0 : (group[i - 1].ids.length) * 20 + step_x;
        console.log(step_x)
        svg.selectAll('vertical__line')
        .data(new Array(type.ids.length + 1))
        .enter()
          .append('line')
            .attr('x1', (d, ind) => step_x + ind * 20)
            .attr('y1', 0)
            .attr('x2', (d, ind) => step_x + ind * 20)
            .attr('y2', '100%')
            .attr('class', 'vertical__line')
            .style('fill', 'none')
            .style('stroke', (d, ind) => type.ids.lastIndexOf(ind) ? 'red' : 'black')
            .style('stroke-width', (d, ind) => type.ids.lastIndexOf(ind) ? 0.35 : 0.2);
      });

      // horizontal grid
      svg.selectAll('horizontal__line')
        .data(new Array(daysInSelectedMonth + 1))
        .enter()
          .append('line')
            .attr('x1', 0)
            .attr('y1', (d, ind) => ind * step)
            .attr('class', 'horizontal__line')
            .attr('x2', step * countGroupType + 10)
            .attr('y2', (d, ind) => ind * step)
            .style('fill', 'none')
            .style('stroke', 'black')
            .style('stroke-width', 0.2);
  }

  private paintTask = (
    svg: TODO_SVG, 
    task: Task,
    options: LineOptions
    ) => {
      const data2: any[] = [];
      task.history.forEach(h => {
        data2.push({
          x: (h.position) * 20, 
          y: h.startDate.getDay() * 20
        });

        data2.push({
          x: (h.position) * 20, 
          y: h.stopDate.getDay() * 20
        })
      });

      const line = d3
        .line()
          .x((d: any) => d.x)
          .y((d: any) => d.y)
          .curve(d3.curveMonotoneX);

      svg.append('path')
        .style('fill', 'none')
        .style('stroke', options.lineColor)
        .style('stroke-width', options.strokeWidth)
        .attr('d', line(data2 as any[]));

      (data2 as any[]).forEach(element => {
        svg.append("circle")
            .attr("class", "node")
            .attr("r", 3)
            .attr("cx", element.x)
            .attr("cy", element.y)
            .on('click', (e) => { console.log(e) })
      });
  }
}

// ДАЛЕЕ
// формат который я буду здесь принимать
export interface Point {
  x: number;
  y: number;
}

type taskFormat = {
  coord: Point,
  nodes: []
}
// ...
