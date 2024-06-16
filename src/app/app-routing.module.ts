import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoriesComponent } from './modules/story/stories/stories.component';

const routes: Routes = [
  { path: 'stories', component: StoriesComponent },
  { path: '', redirectTo: '/stories', pathMatch: 'full' },
  { path: 'sprints', loadChildren: () => import('./modules/sprint/sprint.module').then(m => m.SprintModule) },
  { path: '**', redirectTo: '/stories' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
