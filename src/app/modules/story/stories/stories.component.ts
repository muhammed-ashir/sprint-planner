import { Component, OnInit } from '@angular/core';
import { StoryDataService } from '../services/story-data.service';
import { Story } from 'src/app/shared/models/story';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent implements OnInit {
  stories: Story[] = [];
  filteredStories: Story[] = [];
  showModal: boolean = false;

  constructor(private storyDataService: StoryDataService) {}

  ngOnInit(): void {
    this.storyDataService.stories$.subscribe(stories => {
      this.stories = stories;
      this.filteredStories = stories;
    });
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  deleteStory(id: string) {
    this.storyDataService.deleteStory(id);
  }

  onSearch(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.filteredStories = this.stories.filter(story => 
      story.Name.toLowerCase().includes(searchTerm)
    );
  }

  getPriorityBadgeClass(priority: string) {
    return {
      'bg-danger': priority.toLowerCase() === 'high',
      'bg-warning': priority.toLowerCase() === 'medium',
      'bg-secondary': priority.toLowerCase() === 'low'
    };
  }
}
