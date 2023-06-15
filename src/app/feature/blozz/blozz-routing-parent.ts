import type { Routes } from '@angular/router';
import { FrameComponent } from '@shared/frame/component/frame/frame.component';

export const BLOZZ_ROUTES: Routes = [
  {
    path: '',
    component: FrameComponent,
    loadChildren: () => {
      return import('@feature/blozz/blozz.module').then((m) => {
        return m.BlozzModule;
      });
    },
  },
];
