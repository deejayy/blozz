import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BLOZZ_ROUTES } from '@feature/blozz/blozz-routing-parent';

const routes: Routes = [...BLOZZ_ROUTES];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
