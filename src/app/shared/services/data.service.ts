import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Story } from '../models/story';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
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
