import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphRoutingModule } from './graph-routing.module';
import {GraphCoreService} from './core/graph-core.service'
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { PeopleListComponent } from './components/people-list/people-list.component';
import { GraphComponent } from './components/graph/graph.component';
import { GraphIndexComponent } from './graph-index/graph-index.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
@NgModule({
  declarations: [GraphComponent, PeopleListComponent, GraphIndexComponent],
  imports: [
    CommonModule,
    GraphRoutingModule,
    NzDatePickerModule,
    NzSelectModule,
    NzIconModule
  ],
  providers: [
    { 
      provide: NZ_I18N, 
      useValue: en_US, 
    },
    GraphCoreService
  ]
})
export class GraphModule { }
