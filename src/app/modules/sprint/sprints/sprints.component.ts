import { Component, OnInit } from '@angular/core';
import { SprintDataService } from '../services/sprint-data.service';

@Component({
  selector: 'app-sprints',
  templateUrl: './sprints.component.html',
  styleUrls: ['./sprints.component.css']
})
export class SprintsComponent implements OnInit {
  sprints: any[] = [];
  filteredSprints: any[] = [];

  constructor(private sprintDataService: SprintDataService) {}

  ngOnInit(): void {
    this.sprintDataService.sprints$.subscribe(sprints => {
      this.sprints = sprints;
      this.filteredSprints = sprints;
    });
  }

  deleteSprint(id: string) {
    if (confirm("Are you sure to delete?")) {
      this.sprintDataService.deleteSprint(id);
    }
  }

  formatAsDDMONYYYY(date: Date) {
    const options: any = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(date).toLocaleDateString('en-GB', options).toUpperCase();
  }

  onSearch(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.filteredSprints = this.sprints.filter(sprint => 
      sprint.Name.toLowerCase().includes(searchTerm)
    );
  }
}
