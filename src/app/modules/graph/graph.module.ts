import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphComponent } from './graph/graph.component';
import { GraphRoutingModule } from './graph-routing.module';
import {GraphCoreService} from './core/graph-core.service'
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { GraphService } from './services/graph.service';
import { NzSelectModule } from 'ng-zorro-antd/select';

@NgModule({
  declarations: [GraphComponent],
  imports: [
    CommonModule,
    GraphRoutingModule,
    NzDatePickerModule,
    NzSelectModule
  ],
  providers: [
    { 
      provide: NZ_I18N, 
      useValue: en_US, 
    },
    GraphCoreService,
    GraphService
  ]
})
export class GraphModule { }
