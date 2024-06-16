import { Component, ViewChild } from '@angular/core';
import { StoryDataService } from '../services/story-data.service';
import { Story } from 'src/app/shared/models/story';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent {
  stories!: Story[];
  showModal: boolean = false;

  constructor(private storyDataService: StoryDataService) {}

  ngOnInit(): void {
    this.storyDataService.stories$.subscribe(stories => {
      this.stories = stories;
    });
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  deleteStory(id: string) {
    this.storyDataService.deleteStory(id);
  }
}
