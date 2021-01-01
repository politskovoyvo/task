import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  { 
    path: '', component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../../modules/graph/graph.module').then(m => m.GraphModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {}
