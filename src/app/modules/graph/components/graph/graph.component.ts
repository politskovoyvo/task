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
        const width = 400;
        const height = 5000;
        this.svg = d3
            .select(this.canvas.nativeElement)
            .attr('height', height)
            .attr('width', width)
            .attr('viewBox', [-150, -100, width, height] as any);
    }

    private grid = (tracks: Track[], tasks: Task[], svg: TODO_SVG) => {
        this.maxDate = this.getMaxDate(tasks);
        const taskDraws = tasks.map((task) => new TaskDraw(task, tasks, tracks, step));
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
                if (!findType) {
                    groups.push({
                        type: history.trackId,
                        ids: [task.id],
                        color:
                            tracks.find((pc) => pc.id === history.trackId)?.color || '',
                    });
                }
            });
        });

        // vertical grid
        tracks.forEach((type, index) => {
            svg.append('line')
                .attr('x1', (d, ind) => (index + 1) * step)
                .attr('y1', 0)
                .attr('x2', (d, ind) => (index + 1) * step)
                .attr('y2', '100%')
                .attr('class', 'vertical__line')
                .style('fill', 'none')
                .style('stroke', 'black')
                .style('stroke-dasharray', '20, 4')
                .style('troke-dashoffset', 0)
                .style('opacity', 0.3);

            svg.append('foreignObject')
                .attr('class', 'task__name')
                .style('y', (d, ind) => index * step)
                .style('x', () => 0)
                .style('width', 100)
                .style('height', step)
                .style('transform', 'rotate(-90deg)')
                .html((d, i) => {
                    return type.name;
                });
        });

        svg.append('foreignObject')
            .attr('class', 'task__name')
            .style('y', () => -100)
            .style('zIndex', -100)
            .style('x', () => -40)
            .style('width', () => 40)
            .style('height', '100%');

        this.paintHorizontalDates(taskDraws, tracks);

        // paint Tasks
        taskDraws.forEach((taskDraw, ind) => {
            this.paintTask(taskDraw, svg, {
                lineColor: taskDraw.getTask().color,
                nodeColor: 'black',
                nodeRadius: '5',
                strokeWidth: '3',
            } as LineOptions);
        });
    };

    private paintTaskNamePanel(taskDraw: TaskDraw) {
        const task = taskDraw.getTask();
        this.svg
            .append('foreignObject')
            .attr('class', 'panel__name')
            .style('y', taskDraw.getCreatePoint().y - 10)
            .style('x', () => -150)
            .style('width', () => 100)
            .style('height', 20)
            .style('border', `2px solid ${task.color}`)
            .html(() => task.simbol);

        return taskDraw.getPoints().map((point) => ({
            point,
            info: {
                assignes: taskDraw.getTask().performers,
            },
        }));
    }

    private paintVerticalWaitLine(taskDraws: TaskDraw[]) {
        const ys = taskDraws.map((t) => t.getCreatePoint()).map((point) => point.y);
        const x = taskDraws.map((t) => t.getCreatePoint()).map((point) => point.x)[0];
        const y1 = ys.sort()[0];
        const y2 = ys.sort()[ys.length - 1];

        this.svg
            .append('line')
            .attr('x1', step / 2)
            .attr('y1', y1)
            .attr('class', 'horizontal__line')
            .attr('x2', step / 2)
            .attr('y2', y2)
            .style('fill', 'none')
            .style('stroke', '#2A4480')
            .style('stroke-dasharray', '10, 5')
            .style('stroke-width', 2);
    }

    private paintHorizontalDates(taskDraws: TaskDraw[], tracks: Track[]) {
        const maxDate = this.getMaxDate(this.tasks);
        const minDate = this.getMinDate(this.tasks);
        const lineCount = this.differenceDateDay(maxDate, minDate);
        const dateArray = Array.from({ length: lineCount }, (_, i) => i + 1);
        let marginTop = 0;

        this.paintVerticalWaitLine(taskDraws);

        dateArray.forEach((d) => {
            const date = new Date(this.maxDate);
            const dateSet = date.setDate(date.getDate() - d + 1);
            const currentDateToString = new Date(dateSet).toDateString();
            let createTaskToSomeDayCount = 0;

            const findTask = taskDraws.filter(
                (t) => t.createDate().toDateString() === currentDateToString
            );

            if (findTask.length) {
                const counts = findTask
                    .map((task) => task.createTaskToSomeDayCount())
                    .sort();
                createTaskToSomeDayCount =
                    counts.length !== 1 ? counts[counts.length - 1] + 1 : 0;
            }

            marginTop += step + createTaskToSomeDayCount * 15;

            this.svg
                .append('line')
                .attr('x1', -40)
                .attr('y1', marginTop)
                .attr('class', 'horizontal__line')
                .attr('x2', step * tracks.length)
                .attr('y2', marginTop)
                .style('fill', 'none')
                .style('stroke', 'black')
                .style('stroke-dasharray', '10, 4')
                .style('stroke-width', 0.15);

            this.svg
                .append('text')
                .attr('class', 'barsEndlineText')
                .attr('x', -step)
                .attr('y', () => marginTop - 3)
                .text(() => this.datePipe.transform(date, 'dd.MM'));
        });
    }

    private paintTask = (
        taskDraw: TaskDraw,
        svg: TODO_SVG,
        options: LineOptions
    ): void => {
        const data = this.paintTaskNamePanel(taskDraw);

        const line = d3
            .line()
            .x((d: any) => d.point.x)
            .y((d: any) => d.point.y)
            .curve(d3.curveMonotoneX);

        // отрисовка линии задания
        svg.append('path')
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
                .on('click', () => this.nodeEmit.emit(node));

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

    private dateSortUp(date1: Date, date2: Date) {
        return date1 > date2 ? -1 : 1;
    }

    private dateSortDown(date1: Date, date2: Date) {
        return date1 > date2 ? 1 : -1;
    }

    private getMaxDate(tasks: Task[]): Date {
        return tasks.reduce((acc, task) => {
            return task.history
                .map((h) => h.stopDate)
                .concat(acc)
                .sort(this.dateSortUp)[0];
        }, {} as Date);
    }

    private getMinDate(tasks: Task[]): Date {
        return tasks.reduce((acc, task) => {
            return task.history
                .map((h) => h.startDate)
                .concat(acc)
                .sort(this.dateSortDown)[0];
        }, new Date());
    }

    private differenceDateDay = (maxDate: Date, date: Date) => {
        // +1 для того чтобы была свободная строчка
        return (
            Math.ceil(Math.abs(date.getTime() - maxDate.getTime()) / (1000 * 3600 * 24)) +
            1
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
