import { Component } from '@angular/core';
import { SprintDataService } from '../services/sprint-data.service';

@Component({
  selector: 'app-sprints',
  templateUrl: './sprints.component.html',
  styleUrls: ['./sprints.component.css']
})
export class SprintsComponent {
  sprints!: any[];

  constructor(private sprintDataService: SprintDataService) {}

  ngOnInit(): void {
    this.sprintDataService.stories$.subscribe(sprints => {
      this.sprints = sprints;
    });
  }

  deleteSprint(id: string) {
    this.sprintDataService.deleteSprint(id);
  }
}
