import {Component, Injectable, OnInit} from '@angular/core';
import {States} from '../../../../core/states/states';
import {StatesService} from '../../../../core/services/state/states.service';
import {SubscriptionEvents} from '../../../../core/states/subscription-events';
import {FilterInterface} from '../../../../core/interfaces/filters/filter.interface';


@Component({
  selector: 'app-filters-list',
  templateUrl: './filters-list.component.html',
})
@Injectable({providedIn: 'root'})
export class FiltersListComponent implements OnInit {
  filtersList: Array<FilterInterface>;

  constructor(
    private states: States,
    private statesService: StatesService,
    private subscriptionEvents: SubscriptionEvents,
  ) {
  }

  clearAll(){

    this.statesService.clearFilters();

    // EXTRA FUNCTIONALITY HERE //

    this.filtersList = [];
    this.states.filtersList.next(this.filtersList);
    this.states.isFiltered.next(false);

    this.subscriptionEvents.sendClearFilterEvent();
  }

  ngOnInit(): void {
    this.states.filtersList.subscribe(value => this.filtersList = value);
  }
}
