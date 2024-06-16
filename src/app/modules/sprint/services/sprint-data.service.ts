import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Sprint } from 'src/app/shared/models/sprint';
import { StorageService } from 'src/app/shared/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class SprintDataService {
  private sprintsSubject = new BehaviorSubject<Sprint[]>([]);
  sprints$ = this.sprintsSubject.asObservable();
  
  constructor(private storageService: StorageService) {
    this.loadStories();
  }

  private loadStories(): void {
    const storedSprints = this.storageService.getItem('sprints');
    const sprints = storedSprints || [];
    this.sprintsSubject.next(sprints);
  }

  private saveSprints(sprints: Sprint[]): void {
    this.storageService.setItem('sprints', sprints);
    console.log(sprints);
    
    this.sprintsSubject.next(sprints);
  }

  addSprint(sprint: Sprint) {    
    const newSprint = { ...sprint, Id: this.generateId(sprint.Name) };
    const updatedSprints = [...this.sprintsSubject.value, newSprint];
    this.saveSprints(updatedSprints);
  }

  deleteSprint(id: string) {
    const updatedSprints = this.sprintsSubject.value.filter(sprint => sprint.Id !== id);
    this.saveSprints(updatedSprints);
  }

  generateId(name: string): string{
      return Date.now() + "-" + name;
  }
}
