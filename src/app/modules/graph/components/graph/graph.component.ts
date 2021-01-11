import { DatePipe } from '@angular/common';
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
} from '@angular/core';
import { Track } from '@share/models/track';
import { Task } from '@share/models/task';
import * as d3 from 'd3';
import { LineOptions } from '../../models/line-options';
import { TaskDraw } from '@modules/graph/utilits/task-draw';

const Node = d3.hierarchy.prototype.constructor;
type TODO_NODE = any;
type TODO_SVG = any;
const step = 35;
const horizontalStep = 10;

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
  providers: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GraphComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild('canvas') canvas: ElementRef;
  @Input() tasks: Task[];
  @Input() processTypes: Track[];
  @Output() nodeEmit = new EventEmitter();
  @Output() lineEmit = new EventEmitter();
  @Output() lineMouseEnterEmit = new EventEmitter();

  svg;
  maxDate = new Date();
  nowDate = new Date();

  constructor(private change: ChangeDetectorRef, private datePipe: DatePipe) {}
  ngAfterViewInit(): void {
    this.change.detectChanges();
    this.initSvg();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.tasks?.length && this.processTypes && this.svg) {
      this.svg.selectAll('*').remove();
      this.grid(this.processTypes, this.tasks, this.svg);
    }
  }

  ngOnInit(): void {}

  initSvg() {
    const width = 3000;
    const height = 5000;
    this.svg = d3
      .select(this.canvas.nativeElement)
      .attr('height', height)
      .attr('width', width)
      .attr('viewBox', [-150, -100, width, height] as any);
  }

  private grid = (tracks: Track[], tasks: Task[], svg: TODO_SVG) => {
    this.maxDate = this.getMaxDate(tasks);

    const daysInSelectedMonth = this.nowDate.daysInMonth();
    let groups: {
      type: number;
      color: string;
      ids: number[];
    }[] = [];

    tasks.forEach((task: Task) => {
      task.history.forEach((history, ind) => {
        const findType = groups.find(
          (group) => group.type && group.type === history.trackId
        );
        if (findType) {
          // if (findType.ids.includes(task.id)
          // // для одной колонки ожидания
          // || findType.type === 1) {
          //   return;
          // }
          // findType.ids.push(task.id);
        } else {
          groups.push({
            type: history.trackId,
            ids: [task.id],
            color: tracks.find((pc) => pc.id === history.trackId)?.color || '',
          });
        }
      });
    });

    const countGroupType = groups.reduce((acc, curr) => {
      return acc + curr.ids.length;
    }, 0);

    // последовательность типов
    groups = groups.sort((a, b) => a.type - b.type);

    // vertical grid
    let marginLeft = 0;
    groups.forEach((type, index) => {
      type.ids = type.ids.sort();
      marginLeft = !index ? 0 : groups[index - 1].ids.length * step + marginLeft;

      svg
        .selectAll('vertical__line')
        .data(new Array(type.ids.length + 1))
        .enter()
        .append('line')
        .attr('x1', (d, ind) => marginLeft + ind * step)
        .attr('y1', 0)
        .attr('x2', (d, ind) => marginLeft + ind * step)
        .attr('y2', '100%')
        .attr('class', 'vertical__line')
        .style('fill', 'none')
        .style('stroke', (d, ind) => (type.ids.length === ind ? 'green' : 'black'))
        .style('stroke-dasharray', '20, 4')
        .style('troke-dashoffset', 0)
        .style('opacity', 0.3)
        .style('stroke-width', (d, ind) => (type.ids.length === ind ? 1 : 0.2));

      svg
        .selectAll('task__name')
        .data(new Array(type.ids.length))
        .enter()
        .append('foreignObject')
        .attr('class', 'task__name')
        .style('y', (d, ind) => marginLeft + ind * step)
        .style('x', () => 0)
        .style('width', 100)
        .style('height', step)
        .style('transform', 'rotate(-90deg)')
        .html((d, i) => {
          // const typeId = type.ids[i];
          // return tasks.find((t) => t.id === typeId)?.simbol || '';
          const findType = tracks.find((tr) => tr.id === type.type);
          return findType.name;
        });

      // svg
      //   .append('foreignObject')
      //   .attr('class', 'type__name')
      //   .style('y', () => 0)
      //   .style('zIndex', -5)
      //   .style('x', () => marginLeft)
      //   .style('width', () => step * type.ids.length)
      //   .style('height', step)
      //   .style('background', () => type.color);
    });

    svg
      .append('foreignObject')
      .attr('class', 'task__name')
      .style('y', () => -100)
      .style('zIndex', -5)
      .style('x', () => -40)
      .style('width', () => 40)
      .style('height', '100%');

    // horizontal grid
    svg
      .selectAll('horizontal__line')
      .data(new Array(daysInSelectedMonth))
      .enter()
      .append('line')
      .attr('x1', -40)
      .attr('y1', (d, ind) => ind * step)
      .attr('class', 'horizontal__line')
      .attr('x2', step * countGroupType)
      .attr('y2', (d, ind) => ind * step)
      .style('fill', 'none')
      .style('stroke', 'black')
      .style('stroke-dasharray', '10, 4')
      .style('stroke-width', 0.15);

    svg
      .selectAll('barsEndlineText')
      .data(new Array(daysInSelectedMonth + 1))
      .enter()
      .append('text')
      .attr('class', 'barsEndlineText')
      .attr(
        'x',
        -35
        // () => group.reduce((acc, val) => acc + val.ids.length * step, 0) + 15
      )
      .attr('y', (d, ind) => ind * step - 2)
      .text((d, i) => {
        if (!i) {
          return '';
        }
        const date = new Date(this.maxDate);
        date.setDate(date.getDate() - i + 1);
        return this.datePipe.transform(date, 'dd.MM');
      });

    // paint Tasks
    tasks.forEach((task, ind) => {
      const taskDraw = new TaskDraw(task, tasks, tracks, step);
      this.paintTask(taskDraw, svg, task, groups, {
        lineColor: task.color,
        nodeColor: 'black',
        nodeRadius: '5',
        strokeWidth: '3',
      } as LineOptions);
    });
  };

  private paintTaskNamePanel(task: Task) {
    const minDate = task.history.map((h) => h.stopDate).sort(this.dateSortDown)[0];
    this.svg
      .append('foreignObject')
      .attr('class', 'panel__name')
      .style(
        'y',
        () => this.differenceDateDay(this.maxDate, minDate) * step - step / 2 / 2
      )
      .style('zIndex', -5)
      .style('x', () => -150)
      .style('width', () => 100)
      .style('height', 20)
      .style('border', `2px solid ${task.color}`)
      .html((d, i) => task.simbol);

    return [
      {
        point: {
          x: -50,
          y: this.differenceDateDay(this.maxDate, minDate) * step,
        } as Point,
        info: {
          id: task.id,
          assignes: task.performers,
        } as SelectedNodeInfo,
      },
    ] as any[];
  }

  private paintTask = (
    taskDraw: TaskDraw,
    svg: TODO_SVG,
    task: Task,
    group: {
      type: number;
      ids: number[];
    }[],
    options: LineOptions
  ): void => {
    // const data = this.paintTaskNamePanel(task);

    const data = taskDraw.getPoints().map((point) => ({
      point,
      info: {
        assignes: taskDraw.getPerformers(),
      },
    }));

    const line = d3
      .line()
      .x((d: any) => d.point.x)
      .y((d: any) => d.point.y)
      .curve(d3.curveMonotoneX);

    // отрисовка линии задания
    svg
      .append('path')
      .attr('class', 'path-task')
      .style('stroke', options.lineColor)
      .attr('d', line(data as any))
      .on('click', (e) => {
        this.lineEmit.emit(data);
      })
      .on('mouseout', (e) => {
        this.lineMouseEnterEmit.emit(undefined);
      })
      .on('mouseenter', (e) => {
        this.lineMouseEnterEmit.emit(data);
      });

    // отрисовка точек задания
    data.forEach((element) => {
      const node = svg
        .append('circle')
        .attr('class', 'node')
        .style('fill', options.lineColor)
        .attr('r', options.nodeRadius)
        .attr('cx', element.point.x)
        .attr('cy', element.point.y)
        .on('click', (e) => {
          this.nodeEmit.emit(node);
        });

      node['data'] = element.info;
    });
  };

  getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  dateSortUp = (date1: Date, date2: Date) => {
    return date1 > date2 ? -1 : 1;
  };

  dateSortDown = (date1: Date, date2: Date) => {
    return date1 > date2 ? 1 : -1;
  };

  private getMaxDate = (tasks: Task[]): Date => {
    return tasks.reduce((acc, task) => {
      return task.history
        .map((h) => h.stopDate)
        .concat(acc)
        .sort(this.dateSortUp)[0];
    }, {} as Date);
  };

  private differenceDateDay = (maxDate: Date, date: Date) => {
    // +1 для того чтобы была свободная строчка
    return (
      Math.ceil(Math.abs(date.getTime() - maxDate.getTime()) / (1000 * 3600 * 24)) + 1
    );
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
