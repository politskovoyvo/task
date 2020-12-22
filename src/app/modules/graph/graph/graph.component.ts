import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as d3 from "d3";
import { color } from 'd3';
import { Observable, pipe } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ProcessType } from 'src/app/share/models/pocess-type';
// import * as d3 from 'd3-selection';
import { Task } from 'src/app/share/models/task';
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
    // return;

    const process = {
      x: 100
    }
    const test = {
      x: 200
    }

    const release = {
      x: 300
    }

    tasks.forEach((task, i) => {
      this.paintTask(svg, task, 'green', 4);
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
      let groups: {
        taskId: number,
        processTypeId: number,
        coordinate: {
          point_a: Point,
          point_b: Point,
        }
      }[] = []

      tasks.forEach((task: Task) => {
        const historyIds = task.history.map(h => h.tipeId).unique();
        if (!historyIds) {
          return;
        }
        processTypeGroup = processTypeGroup.concat(historyIds).sort();
      });

      // vertical grid
      const transitionGroupFunc = (index: number) => processTypeGroup[index] !== processTypeGroup[index - 1];
      svg.selectAll('vertical__line')
        .data(new Array(processTypeGroup.length + 1))
        .enter()
          .append('line')
            .attr('x1', (d, ind) => ind * step)
            .attr('y1', 0)
            .attr('x2', (d, ind) => ind * step)
            .attr('y2', '100%')
            .attr('class', 'vertical__line')
            .style('fill', 'none')
            .style('stroke', (d, ind) => transitionGroupFunc(ind) ? 'red' : 'black')
            .style('stroke-width', (d, ind) => transitionGroupFunc(ind) ? 0.35 : 0.2);

      // horizontal grid
      svg.selectAll('horizontal__line')
        .data(new Array(daysInSelectedMonth + 1))
        .enter()
          .append('line')
            .attr('x1', 0)
            .attr('y1', (d, ind) => ind * step)
            .attr('class', 'horizontal__line')
            .attr('x2', step * processTypeGroup.length + 10)
            .attr('y2', (d, ind) => ind * step)
            .style('fill', 'none')
            .style('stroke', 'black')
            .style('stroke-width', 0.2);
  }

  private paintTask = (
    svg: any, 
    task: Task,
    color = 'gray',
    stroke_width = '5'
    ) => {
      const data2: any[] = [];
      task.history.forEach(h => {
        data2.push({
          x: 40, 
          y: h.startDate.getDay() * 100
        }),
        data2.push({
          x: 120, 
          y: h.stopDate.getDay() * 100
        })
      })
      // task.
      // const data2: any[] = [ 
      //   // шаг - 50
      //   { x: 100, y: 50  },
      //   { x: 100, y: 100 },
      //   { x: 100, y: 150 },
      //   { x: 150, y: 200 },
      //   { x: 150, y: 250 },
      //   { x: 150, y: 300 },
      //   { x: 200, y: 350 },
      // ];

      const line = d3
      .line()
        .x((d: any) => d.x)
        .y((d: any) => d.y)
        .curve(d3.curveMonotoneX);

      svg
        .append('path')
        .style('fill', 'none')
        .style('stroke', color)
        .style('stroke-width', stroke_width)
        .attr('d', line(data2 as any[]));

      (data2 as any[]).forEach(element => {
        svg
          .append("circle")
            .attr("class", "node")
            .attr("r", 7)
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
