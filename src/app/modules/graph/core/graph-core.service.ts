import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { IntervalDate } from "src/app/share/models/interval-date";
import { Task } from "src/app/share/models/task";

@Injectable()
export class GraphCoreService {

  constructor() {}

  public getTypes = (): Observable<{id: number, name: string}[]> => {
    return of([
      {
        id: 1,
        name: 'Test'
      },
      {
        id: 2,
        name: 'Process'
      },
      {
        id: 3,
        name: 'Release'
      },
    ])
  }

  public getTasks(): Observable<Task[]> {
    return of([
      <Task>{
        id: 1,
        name: "Реализовать функционал 1",
        simbol: "TASK-1",
        history: [
          {
            tipeId: 2,
            startDate: new Date(2020, 11, 2),
            stopDate: new Date(2020, 11, 5)
          },
          {
            tipeId: 1,
            startDate: new Date(2020, 11, 5),
            stopDate: new Date(2020, 11, 7)
          },
          {
            tipeId: 3,
            startDate: new Date(2020, 11, 7),
            stopDate: new Date(2020, 11, 7)
          },
        ],
        interval: <IntervalDate>{
          startDate: new Date(2020, 11, 1),
          stopDate: new Date(2020, 11, 10),
        },
        priority: "mego-need",
        type: "type",

        assignee: [
          { id: 1, name: "Тест 1 Тестович" },
          { id: 2, name: "Тест 2 Тестович" },
        ],
      },
    ]);
  }
}
