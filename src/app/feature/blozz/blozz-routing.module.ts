import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlozzComponent } from '@feature/blozz/component/blozz/blozz.component';
import { SettingsComponent } from '@feature/blozz/module/settings/component/settings/settings.component';

const subRoutes: Routes = [
  {
    path: '',
    component: BlozzComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(subRoutes)],
  exports: [RouterModule],
})
export class BlozzRoutingModule {}
