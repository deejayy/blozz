import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlozzComponent } from '@feature/blozz/component/blozz/blozz.component';

const subRoutes: Routes = [
  {
    path: '',
    component: BlozzComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(subRoutes)],
  exports: [RouterModule],
})
export class BlozzRoutingModule {}
