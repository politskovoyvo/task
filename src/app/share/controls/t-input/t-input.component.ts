import { Component, Input, OnInit } from '@angular/core';

@Component({
  // @ts-ignore
  selector: 't-input',
  templateUrl: './t-input.component.html',
  styleUrls: ['./t-input.component.scss'],
})
export class TInputComponent implements OnInit {
  @Input() placeholder = 'Введите название';
  @Input() type: 'input' | 'textarea' = 'input';
  @Input() width = '100%';

  textValue = '';

  constructor() {}

  ngOnInit(): void {}
}
