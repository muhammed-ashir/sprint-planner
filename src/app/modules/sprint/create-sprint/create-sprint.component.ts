import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SprintDataService } from '../services/sprint-data.service';
import { Story } from 'src/app/shared/models/story';
import { StoryDataService } from '../../story/services/story-data.service';
import { Sprint } from 'src/app/shared/models/sprint';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-create-sprint',
  templateUrl: './create-sprint.component.html',
  styleUrls: ['./create-sprint.component.css']
})
export class CreateSprintComponent {
  createSprintForm: FormGroup;
  stories!: Story[];

  constructor(private sprintDataService: SprintDataService, 
    private fb: FormBuilder,
    private storyDataService: StoryDataService) {
      this.createSprintForm = this.fb.group({
        Name: ['', Validators.required],
        Points: ['', [Validators.required, Validators.min(0)]],
        StartDate: ['', Validators.required],
        AddedStories: this.fb.array([]) 
      });
  }

  get AddedStories(): FormArray {
      return this.createSprintForm.get('AddedStories') as FormArray;
  }

  ngOnInit() {
      this.storyDataService.stories$.subscribe(stories => {
        this.stories = stories;
      });
  }

  populateAddedStories(points: number) {
      this.onClearAddedStories();
      
      const sortedStories = this.stories.sort((a, b) => {
        const priorityOrder: any = { 'high': 1, 'medium': 2, 'low': 3 };
        const priorityComparison = priorityOrder[a.Priority.toLowerCase()] - priorityOrder[b.Priority.toLowerCase()];
        if (priorityComparison !== 0) {
          return priorityComparison;
        } else {
          return a.Points - b.Points;
        }
      });

      let totalPoints = 0;
      for (const story of sortedStories) {
        if (totalPoints + story.Points <= points) {
          this.addStory(story);
          totalPoints += story.Points;
        } else {
          continue;
        }
      }
  }

  addStory(story: Story) {
      const existingStory = this.AddedStories.controls.find(ctrl => ctrl.value.Id === story.Id);
      if (!existingStory) {
        const storyGroup = this.fb.group(story);
        this.AddedStories.push(storyGroup);
      } 
  }

  removeStory(index: number) {
      const story = this.AddedStories.at(index);
      this.AddedStories.removeAt(index);
  }

  onClearAddedStories() {
      this.AddedStories.clear(); 
  }

  onClearStories() {
      this.storyDataService.deleteAllStories();
  }

  onSubmit() {
      this.createSprintForm.markAllAsTouched();
      this.validateAddedStories();
      if (this.createSprintForm.valid) {
        const sprintData: Sprint = this.createSprintForm.value;
        sprintData.EndDate = this.calculateEndDate(sprintData.Points, sprintData.StartDate);
        this.sprintDataService.addSprint(sprintData);
        
      }
  }

  validateAddedStories(){
      const addedStoriesControl = this.createSprintForm.get('AddedStories');
      const totalPoints = this.AddedStories.controls.reduce((sum, ctrl) => sum + ctrl.value.Points, 0);
      const maxPoints = this.createSprintForm.value.Points;

      if (this.AddedStories.length === 0) {
        addedStoriesControl?.markAsDirty();
        addedStoriesControl?.setErrors({ noStoriesAdded: true });
      } else if (totalPoints > maxPoints) {
        addedStoriesControl?.markAsDirty();
        addedStoriesControl?.setErrors({ pointExceeded: true });
      } else {
        addedStoriesControl?.markAsPristine();
        addedStoriesControl?.setErrors(null);
      }
  }

  calculateEndDate(totalPoints: number, startDate: Date): Date {
      const pointsPerDay = 2;
      const days = Math.ceil(totalPoints / pointsPerDay);
      const endDate = new Date();
      endDate.setDate(new Date(startDate).getDate() + days);
      return endDate;
  }

  getErrorMessages(controlName: string): string[] {
      const control = this.createSprintForm.get(controlName);
      const errors = control?.errors;
      const messages: string[] = [];
    
      if (errors) {
        for (const error in errors) {
            switch (error) {
              case 'required':
                messages.push(`This field is required`);
                break;
              case 'min':
                messages.push(`Must be a non-negative number`);
                break;
              case 'noStoriesAdded':
                messages.push(`You must add at least one story to the sprint`);
                break;
              case 'pointExceeded':
                messages.push(`Total points of added stories exceeds the maximum points`);
                break;
            }
        }
      }
    
      return messages;
  }
}
