import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Story } from 'src/app/shared/models/story';
import { StorageService } from 'src/app/shared/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class StoryDataService {

  private storiesSubject = new BehaviorSubject<Story[]>([]);
  stories$ = this.storiesSubject.asObservable();

  constructor(private storageService: StorageService) {
    this.loadStories();
  }

  private loadStories(): void {
    const storedStories = this.storageService.getItem('stories');
    const stories = storedStories || [];
    this.storiesSubject.next(stories);
  }

  private saveStories(stories: Story[]): void {
    this.storageService.setItem('stories', stories);
    this.storiesSubject.next(stories);
  }

  addStory(story: Story) {    
    const newStory = { ...story, Id: this.generateId(story.Name) };
    const updatedStories = [...this.storiesSubject.value, newStory];
    this.saveStories(updatedStories);
  }

  deleteStory(id: string) {
    const updatedStories = this.storiesSubject.value.filter(story => story.Id !== id);
    this.saveStories(updatedStories);
  }

  generateId(name: string): string{
      return Date.now() + "-" + name;
  }
  
}
