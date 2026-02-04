import { Component, OnDestroy, OnInit } from "@angular/core";

@Component({
  selector: 'app-flower-list',
  standalone: true,
  templateUrl: './flower-list.template.html',
  styleUrls: ['./flower-list.style.scss']
})
export class FlowerListComponent implements OnInit, OnDestroy {
  // Placeholder for total photos Number
  totalPhotosNumber: number = 123456;

  ngOnInit(): void {
    // Initialization logic here
  }

  ngOnDestroy(): void {
    // Cleanup logic here
  }
}
