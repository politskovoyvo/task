import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphRoutingModule } from './graph-routing.module';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { GraphComponent } from './components/graph/graph.component';
import { GraphIndexComponent } from './graph-index/graph-index.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TInputModule } from '@share/controls/t-input/t-input.module';
import { PeopleListComponent } from '@components/people-list/people-list.component';
import { TaskCardComponent } from '@components/task-card/task-card.component';
import { CreateBoardComponent } from '@components/create-board/create-board.component';
import { TDropdownModule } from '@share/controls/t-dropdown/t-dropdown.module';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TSelectModule } from '@share/controls/t-select/t-select.module';
import { TaskListComponent } from '@components/task-list/task-list.component';
import { TMiltySelectModule } from '@share/controls/t-milty-select/t-milty-select.module';

@NgModule({
  declarations: [
    GraphComponent,
    PeopleListComponent,
    GraphIndexComponent,
    TaskCardComponent,
    CreateBoardComponent,
    TaskListComponent
  ],
  imports: [
    CommonModule,
    GraphRoutingModule,
    NzDatePickerModule,
    NzSelectModule,
    NzIconModule,
    TInputModule,
    TDropdownModule,
    NzDropDownModule,
    FormsModule,
    TSelectModule,
    TMiltySelectModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: NZ_I18N,
      useValue: en_US,
    },
  ],
})
export class GraphModule {}
