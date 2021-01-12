import { Base } from '@share/models/base';
import { Task } from '@share/models/task';
import { Track } from '@share/models/track';
import { Point } from '../components/graph/graph.component';

interface ITaskDraw {
  getPoints(): Point[];
  createTaskToSomeDayCount(tasks: Task[]): number;
  createDate(): Date;
  getCreatePoint(): Point;
  getTask(): Task;
}

export class TaskDraw implements ITaskDraw {
  private _points: Point[];
  private _task: Task;
  private _tasks: Task[];
  private _tracks: Track[];
  private _step: number;

  constructor(task: Task, tasks: Task[], tracks: Track[], step: number) {
    this._task = task;
    this._tracks = tracks;
    this._step = step;
    this._tasks = tasks;

    this.setPoint();
  }

  createTaskToSomeDayCount(): number {
    if (!this._tasks?.length) {
      return 0;
    }

    const createDateString = this.createDate().toDateString();
    const taskFilterByIds = this._tasks.filter((t) => t.id > this._task.id);
    const createdToSameDateFilter = taskFilterByIds.filter((t) =>
      t.history.some(
        (h) => h.startDate.toDateString() === createDateString && h.trackId === 1
      )
    );

    return createdToSameDateFilter?.length || 0;
  }

  getPoints(): Point[] {
    return this._points;
  }

  getTask(): Task {
    return this._task;
  }

  createDate(): Date | undefined {
    return (
      this._task.history?.map((h) => h.stopDate)?.sort(TaskDraw.dateSortDown)[0] ||
      undefined
    );
  }

  private differenceDay(maxDate: Date, date: Date): number {
    // +1 для того чтобы была свободная строчка
    return (
      Math.ceil(Math.abs(date.getTime() - maxDate.getTime()) / (1000 * 3600 * 24)) + 1
    );
  }

  private setPoint(): void {
    const createDateString = this.createDate().toDateString();

    this._points =
      this._task.history?.reduce((acc, val) => {
        let start_y =
          this.differenceDay(this.getMaxDate(this._tasks), val.startDate) * this._step;
        let end_y =
          this.differenceDay(this.getMaxDate(this._tasks), val.stopDate) * this._step;
        let x =
          this._tracks.map((t) => t.id).indexOf(val.trackId) * this._step +
          this._step / 2;
        if (val.startDate.toDateString() === createDateString) {
          const marginBotton = 15;
          start_y += this.createTaskToSomeDayCount() * marginBotton;
          end_y += this.createTaskToSomeDayCount() * marginBotton;
        }
        acc = acc.concat({ x, y: start_y }, { x, y: end_y });
        return acc;
      }, [] as Point[]) || [];
    this._points.unshift({
      x: -50,
      y: this._points[0].y,
    });
  }

  getCreatePoint(): Point {
    return this._points[0];
  }

  getMaxDate(tasks: Task[]): Date {
    return tasks.reduce((acc, task) => {
      return task.history
        .map((h) => h.stopDate)
        .concat(acc)
        .sort(TaskDraw.dateSortUp)[0];
    }, {} as Date);
  }

  static dateSortUp(date1: Date, date2: Date): number {
    return date1 > date2 ? -1 : 1;
  }

  static dateSortDown(date1: Date, date2: Date): number {
    return date1 > date2 ? 1 : -1;
  }
}
