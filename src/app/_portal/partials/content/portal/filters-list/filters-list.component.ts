import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Injectable, OnInit} from '@angular/core';
import {StatesService} from '../../../../core/services/state/states.service';
import {SubscriptionEvents} from '../../../../core/states/subscription-events';
import {FilterInterface} from '../../../../core/interfaces/filters/filter.interface';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-filters-list',
  templateUrl: './filters-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@Injectable({providedIn: 'root'})
export class FiltersListComponent implements OnInit {
  filtersList: Array<FilterInterface>;

  clearFilterEventSubscription: Subscription;

  constructor(
    private ref: ChangeDetectorRef,
    private statesService: StatesService,
    private subscriptionEvents: SubscriptionEvents,
  ) {
    ref.detach();
    this.clearFilterEventSubscription = this.subscriptionEvents.getClearEventSubject().subscribe(() => {
      this.clearAll();
    });
    setInterval(() => {
      if (!this.ref['destroyed']) {
        this.ref.detectChanges();
      }
    }, 1);
  }

  clearAll(){

    this.statesService.clearFilters();

    // EXTRA FUNCTIONALITY HERE //
    this.statesService.categoriesList.forEach(category => {
      category.filters.forEach(filter => {
        filter.isSelected = false;
        if (filter.children !== undefined && filter.children !== null) {
          for (const child of filter.children) {
            child.isSelected = false;
          }
        }
      });
    });

    this.statesService.filtersList = [];
    this.filtersList = this.statesService.filtersList;
    this.statesService.isFiltered = false;

    this.subscriptionEvents.sendClearFilterEvent();
  }

  ngOnInit(): void {
    this.filtersList = this.statesService.filtersList;
  }
}
