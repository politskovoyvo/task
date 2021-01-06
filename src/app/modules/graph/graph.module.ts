import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphRoutingModule } from './graph-routing.module';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { PeopleListComponent } from './components/people-list/people-list.component';
import { GraphComponent } from './components/graph/graph.component';
import { GraphIndexComponent } from './graph-index/graph-index.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TInputModule } from '@share/controls/t-input/t-input.module';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { TaskCoreService } from '@core/services/task-core.service';
import { BoardCoreService } from '@core/services/board-core.service';
@NgModule({
  declarations: [
    GraphComponent,
    PeopleListComponent,
    GraphIndexComponent,
    CreateTaskComponent,
  ],
  imports: [
    CommonModule,
    GraphRoutingModule,
    NzDatePickerModule,
    NzSelectModule,
    NzIconModule,
    TInputModule
  ],
  providers: [
    {
      provide: NZ_I18N,
      useValue: en_US,
    },
    TaskCoreService,
    BoardCoreService
  ],
})
export class GraphModule {}
