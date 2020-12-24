import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { IntervalDate } from "src/app/share/models/interval-date";
import { ProcessType } from 'src/app/share/models/pocess-type';
import { Task } from "src/app/share/models/task";

@Injectable()
export class GraphCoreService {

  constructor() {}

  public getTypes = (): Observable<ProcessType[]> => {
    return of([
      {
        id: 1,
        name: 'Test',
      } as ProcessType,
      {
        id: 2,
        name: 'Process',
      } as ProcessType,
      {
        id: 3,
        name: 'Release',
      } as ProcessType,
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
            position: 1,
            startDate: new Date(2020, 11, 1),
            stopDate: new Date(2020, 11, 5)
          },
          {
            position: 2,
            startDate: new Date(2020, 11, 5),
            stopDate: new Date(2020, 11, 7)
          },
          {
            position: 3,
            startDate: new Date(2020, 11, 7),
            stopDate: new Date(2020, 11, 8)
          },
          // {
          //   position: 3,
          //   startDate: new Date(2020, 11, 8),
          //   stopDate: new Date(2020, 11, 9)
          // },
          // {
          //   position: 4,
          //   startDate: new Date(2020, 11, 9),
          //   stopDate: new Date(2020, 11, 10)
          // },
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
      <Task>{
        id: 2,
        name: "Реализовать функционал 1",
        simbol: "TASK-1",
        history: [
          {
            position: 1,
            startDate: new Date(2020, 11, 3),
            stopDate: new Date(2020, 11, 4)
          },
          {
            position: 2,
            startDate: new Date(2020, 11, 4),
            stopDate: new Date(2020, 11, 5)
          },
          {
            position: 3,
            startDate: new Date(2020, 11, 6),
            stopDate: new Date(2020, 11, 10)
          },
          // {
          //   position: 5,
          //   startDate: new Date(2020, 11, 7),
          //   stopDate: new Date(2020, 11, 7)
          // },
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
      // <Task>{
      //   id: 2,
      //   name: "Реализовать функционал 2",
      //   simbol: "TASK-2",
      //   history: [
      //     {
      //       tipeId: 2,
      //       startDate: new Date(2020, 11, 2),
      //       stopDate: new Date(2020, 11, 5)
      //     },
      //     {
      //       tipeId: 1,
      //       startDate: new Date(2020, 11, 5),
      //       stopDate: new Date(2020, 11, 7)
      //     },
      //     {
      //       tipeId: 3,
      //       startDate: new Date(2020, 11, 7),
      //       stopDate: new Date(2020, 11, 7)
      //     },
      //   ],
      //   interval: <IntervalDate>{
      //     startDate: new Date(2020, 11, 1),
      //     stopDate: new Date(2020, 11, 10),
      //   },
      //   priority: "mego-need",
      //   type: "type",

      //   assignee: [
      //     { id: 1, name: "Тест 1 Тестович" },
      //     { id: 2, name: "Тест 2 Тестович" },
      //   ],
      // },
      // <Task>{
      //   id: 3,
      //   name: "Реализовать функционал 3",
      //   simbol: "TASK-3",
      //   history: [
      //     {
      //       tipeId: 2,
      //       startDate: new Date(2020, 11, 2),
      //       stopDate: new Date(2020, 11, 5)
      //     },
      //     {
      //       tipeId: 1,
      //       startDate: new Date(2020, 11, 5),
      //       stopDate: new Date(2020, 11, 7)
      //     },
      //     {
      //       tipeId: 3,
      //       startDate: new Date(2020, 11, 7),
      //       stopDate: new Date(2020, 11, 7)
      //     },
      //   ],
      //   interval: <IntervalDate>{
      //     startDate: new Date(2020, 11, 1),
      //     stopDate: new Date(2020, 11, 10),
      //   },
      //   priority: "mego-need",
      //   type: "type",

      //   assignee: [
      //     { id: 1, name: "Тест 1 Тестович" },
      //     { id: 2, name: "Тест 2 Тестович" },
      //   ],
      // },
    ]);
  }
}
