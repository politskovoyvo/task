import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphRoutingModule } from './graph-routing.module';
import { GraphComponent } from './components/graph/graph.component';
import { GraphIndexComponent } from './graph-index/graph-index.component';
import { TInputModule } from '@share/controls/t-input/t-input.module';
import { PeopleListComponent } from '@components/people-list/people-list.component';
import { TaskCardComponent } from '@components/task-card/task-card.component';
import { CreateBoardComponent } from '@components/create-board/create-board.component';
import { TDropdownModule } from '@share/controls/t-dropdown/t-dropdown.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TSelectModule } from '@share/controls/t-select/t-select.module';
import { TaskListComponent } from '@components/task-list/task-list.component';
import { TMiltySelectModule } from '@share/controls/t-milty-select/t-milty-select.module';
import { SpendTimeListComponent } from '@components/spend-time-list/spend-time-list.component';
import { AntDesingModule } from '@share/ant-desing/ant-desing.module';
import { NoDataComponent } from '@share/components/no-data/no-data.component';
import { IsDirtyDirective } from '@share/directives/is-dirty.directive';

@NgModule({
    declarations: [
        GraphComponent,
        PeopleListComponent,
        GraphIndexComponent,
        TaskCardComponent,
        TaskListComponent,
        CreateBoardComponent,
        SpendTimeListComponent,
        NoDataComponent,
        IsDirtyDirective,
    ],
    imports: [
        GraphRoutingModule,
        ReactiveFormsModule,
        TMiltySelectModule,
        AntDesingModule,
        TDropdownModule,
        CommonModule,
        TInputModule,
        FormsModule,
        TSelectModule,
    ],
})
export class GraphModule {}
