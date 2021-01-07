import { Component, Input, OnInit } from '@angular/core';

@Component({
  // @ts-ignore
  selector: 't-dropdown',
  templateUrl: './t-dropdown.component.html',
  styleUrls: ['./t-dropdown.component.scss'],
})
export class TDropdownComponent implements OnInit {
  @Input() icon = '';

  constructor() {}

  ngOnInit(): void {}
}
