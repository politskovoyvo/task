import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphComponent } from './graph/graph.component';
import { GraphRoutingModule } from './graph-routing.module';

@NgModule({
  declarations: [GraphComponent],
  imports: [
    CommonModule,
    GraphRoutingModule
  ]
})
export class GraphModule { }
