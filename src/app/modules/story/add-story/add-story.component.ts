import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Story } from 'src/app/shared/models/story';
import { StoryDataService } from '../services/story-data.service';

@Component({
  selector: 'app-add-story',
  templateUrl: './add-story.component.html',
  styleUrls: ['./add-story.component.css']
})
export class AddStoryComponent {
  @Input() show: boolean = false; 
  @Output() onHide: EventEmitter<void> = new EventEmitter<void>(); 
  addStoryForm!: FormGroup;

  constructor(private storyDataService: StoryDataService, private formBuilder: FormBuilder) { }

  ngOnInit() {
      this.addStoryForm = this.formBuilder.group({
          Name: ['', Validators.required],
          Priority: ['', Validators.required],
          Points: ['', Validators.required]
      });
  }

  closeModal() {
      this.show = false; 
      this.onHide.emit(); 
  }

  onSubmit() {
      this.addStoryForm.markAllAsTouched();
      if (this.addStoryForm.valid) {
          const storyData: Story = this.addStoryForm.value;
          this.storyDataService.addStory(storyData);
          this.addStoryForm.reset();
          this.closeModal();
      }
  }

  getErrorMessages(controlName: string): string[] {
      const control = this.addStoryForm.get(controlName);
      const errors = control?.errors;
      const messages: string[] = [];
    
      if (errors) {
        for (const error in errors) {
            switch (error) {
              case 'required':
                messages.push(`This field is required`);
                break;
            }
        }
      }
    
      return messages;
  }
}
