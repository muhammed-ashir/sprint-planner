import { Component, ViewChild } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent {

  stories!: any[];
  showModal: boolean = false;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.stories$.subscribe(stories => {
      this.stories = stories;
    });
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  deleteStory(id: string) {
    this.dataService.deleteStory(id);
  }
}
