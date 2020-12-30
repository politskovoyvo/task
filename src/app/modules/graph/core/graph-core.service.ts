import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { IntervalDate } from "src/app/share/models/interval-date";
import { ProcessType } from "src/app/share/models/pocess-type";
import { Task } from "src/app/share/models/task";

@Injectable()
export class GraphCoreService {
  constructor() {}

  public getTypes = (): Observable<ProcessType[]> => {
    return of([
      {
        id: 1,
        name: "Wait",
        color: "#F0E68C",
      } as ProcessType,
      {
        id: 2,
        name: "Process",
        color: "#BA55D3",
      } as ProcessType,
      {
        id: 3,
        name: "Test",
        color: "#4169E1",
      } as ProcessType,
      {
        id: 4,
        name: "Done",
        color: "#008B8B",
      } as ProcessType,
      {
        id: 5,
        name: "Release",
        color: "#FF7F50",
      } as ProcessType,
    ]);
  };

  public getTasks(): Observable<Task[]> {
    return of([
      <Task>{
        id: 1,
        name: "Реализовать функционал 1",
        simbol: "ORR-2020",
        color: "#70227E",
        history: [
          {
            position: 1,
            startDate: new Date(2020, 11, 1),
            stopDate: new Date(2020, 11, 5),
          },
          {
            position: 2,
            startDate: new Date(2020, 11, 5),
            stopDate: new Date(2020, 11, 7),
          },
          {
            position: 3,
            startDate: new Date(2020, 11, 7),
            stopDate: new Date(2020, 11, 8),
          },
          {
            position: 4,
            startDate: new Date(2020, 11, 8),
            stopDate: new Date(2020, 11, 12),
          },
          {
            position: 5,
            startDate: new Date(2020, 11, 13),
            stopDate: new Date(2020, 11, 13),
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
          { id: 3, name: "Тест 3 Тестович" },
        ],
      },
      <Task>{
        id: 2,
        name: "Реализовать функционал 1",
        simbol: "ORR-2021",
        color: "blue",
        history: [
          {
            position: 1,
            startDate: new Date(2020, 11, 2),
            stopDate: new Date(2020, 11, 4),
          },
          {
            position: 3,
            startDate: new Date(2020, 11, 4),
            stopDate: new Date(2020, 11, 5),
          },
          {
            position: 4,
            startDate: new Date(2020, 11, 7),
            stopDate: new Date(2020, 11, 12),
          },
          {
            position: 5,
            startDate: new Date(2020, 11, 13),
            stopDate: new Date(2020, 11, 13),
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
          { id: 5, name: "Тест 5 Тестович" },
          { id: 2, name: "Тест 2 Тестович" },
          { id: 4, name: "Тест 4 Тестович" },
        ],
      },
      <Task>{
        id: 3,
        name: "Реализовать функционал 2",
        simbol: "ORR-2022",
        color: "green",
        history: [
          {
            position: 1,
            startDate: new Date(2020, 11, 2),
            stopDate: new Date(2020, 11, 8),
          },
          {
            position: 2,
            startDate: new Date(2020, 11, 9),
            stopDate: new Date(2020, 11, 10),
          },
          {
            position: 4,
            startDate: new Date(2020, 11, 10),
            stopDate: new Date(2020, 11, 12),
          },
          {
            position: 5,
            startDate: new Date(2020, 11, 13),
            stopDate: new Date(2020, 11, 13),
          },
        ],
        interval: <IntervalDate>{
          startDate: new Date(2020, 11, 14),
          stopDate: new Date(2020, 11, 14),
        },
        priority: "mego-need",
        type: "type",

        assignee: [
          { id: 1, name: "Тест 1 Тестович" },
          { id: 2, name: "Тест 2 Тестович" },
          { id: 2, name: "Тест 2 Тестович" },
          { id: 6, name: "Тест 6 Тестович" },
        ],
      },
    ]);
  }
}
