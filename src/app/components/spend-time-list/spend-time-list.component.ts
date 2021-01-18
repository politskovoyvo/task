import { Component, Input, OnInit } from '@angular/core';
import { SpendTime } from '@share/models/spend-time';

@Component({
  selector: 'app-spend-time-list',
  templateUrl: './spend-time-list.component.html',
  styleUrls: ['./spend-time-list.component.scss']
})
export class SpendTimeListComponent implements OnInit {
  @Input() spendTimes: SpendTime[];

  constructor() { }

  ngOnInit(): void {
  }

}
