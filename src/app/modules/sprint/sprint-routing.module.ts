import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SprintsComponent } from './sprints/sprints.component';
import { CreateSprintComponent } from './create-sprint/create-sprint.component';

const routes: Routes = [
  { path: '', component: SprintsComponent },
  { path: 'create-sprint', component: CreateSprintComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SprintRoutingModule { }
