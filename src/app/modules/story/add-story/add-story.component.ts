import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Story } from 'src/app/shared/models/story';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-add-story',
  templateUrl: './add-story.component.html',
  styleUrls: ['./add-story.component.css']
})
export class AddStoryComponent {
  @Input() show: boolean = false; 
  @Output() onHide: EventEmitter<void> = new EventEmitter<void>(); 
  storyForm!: FormGroup;

  constructor(private dataService: DataService, private formBuilder: FormBuilder) { }

  ngOnInit() {
      this.storyForm = this.formBuilder.group({
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
      if (this.storyForm.valid) {
          const storyData: Story = this.storyForm.value;
          this.dataService.addStory(storyData);
          this.storyForm.reset();
      }
  }
}
