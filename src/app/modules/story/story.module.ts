import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoriesComponent } from './stories/stories.component';
import { AddStoryComponent } from './add-story/add-story.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    StoriesComponent,
    AddStoryComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class StoryModule { }
