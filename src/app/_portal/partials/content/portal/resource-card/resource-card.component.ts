import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-resource-card',
  templateUrl: './resource-card.component.html',
})
export class ResourceCardComponent implements OnInit {
  @Input() id: number;
  @Input() resourceTitle: string;
  @Input() doi: string;
  @Input() abstract: string;
  @Input() authors: string;

  public showMore: boolean;

  constructor() {
  }

  showMoreToggle(){
    return this.showMore = !this.showMore;
  }

  ngOnInit(): void {
  }
}
