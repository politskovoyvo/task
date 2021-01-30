import { Task } from '@share/models/task';
import { Track } from '@share/models/track';
import { Point } from '../components/graph/graph.component';

interface ITaskDraw {
    getPoints(): Point[];

    createTaskToSomeDayCount(tasks: Task[]): number;

    createDate(): Date;

    getCreatePoint(): Point;

    getTask(): Task;

    setPoint(
        axis: {
            date: string;
            coordinateY: number;
        }[]
    );
}

export class TaskDraw implements ITaskDraw {
    private readonly _task: Task;
    private readonly _step: number;
    private _points: Point[];
    private _tasks: Task[];
    private _tracks: Track[];

    constructor(task: Task, tasks: Task[], tracks: Track[], step: number) {
        this._task = task;
        this._tracks = tracks;
        this._step = step;
        this._tasks = tasks;
    }

    createTaskToSomeDayCount(): number {
        if (!this._tasks?.length) {
            return 0;
        }

        const createDateString = this.createDate().toDateString();
        const taskFilterByIds = this._tasks.filter((t) => t.id >= this._task.id);
        const createdToSameDateFilter = taskFilterByIds.filter((t: Task) =>
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

    setPoint(
        axis: {
            date: string;
            coordinateY: number;
        }[]
    ): void {
        const createDateString = this.createDate().toDateString();

        this._points =
            this._task.history?.reduce((acc, val) => {
                const findAxis = axis.find(
                    (a) => a.date === val.startDate.toDateString()
                );
                let startY = findAxis.coordinateY;
                let endY = findAxis.coordinateY;
                const x =
                    this._tracks.map((t) => t.id).indexOf(val.trackId) * this._step +
                    this._step / 2;
                if (val.startDate.toDateString() === createDateString) {
                    const marginBottom = 15;
                    startY -= this.createTaskToSomeDayCount() * marginBottom;
                    endY -= this.createTaskToSomeDayCount() * marginBottom;
                }
                acc = acc.concat({ x, y: startY }, { x, y: endY });
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

    static dateSortUp(date1: Date, date2: Date): number {
        return date1 > date2 ? -1 : 1;
    }

    static dateSortDown(date1: Date, date2: Date): number {
        return date1 > date2 ? 1 : -1;
    }
}
