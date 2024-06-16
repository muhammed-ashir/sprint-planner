import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SprintRoutingModule } from './sprint-routing.module';
import { SprintsComponent } from './sprints/sprints.component';
import { CreateSprintComponent } from './create-sprint/create-sprint.component';


@NgModule({
  declarations: [
    SprintsComponent,
    CreateSprintComponent
  ],
  imports: [
    CommonModule,
    SprintRoutingModule
  ]
})
export class SprintModule { }
