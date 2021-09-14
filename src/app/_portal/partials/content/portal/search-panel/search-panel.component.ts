import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';
import {SubscriptionEvents} from '../../../../core/states/subscription-events';
import {StatesService} from '../../../../core/services/state/states.service';
import {SearchService} from '../../../../core/services/portal/search.service';
import {SearchOptionsInterface} from '../../../../core/interfaces/search/search-options.interface';


@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
})
export class SearchPanelComponent implements OnInit {

  @ViewChild('searchValue') searchValue: any;

  @Output() search: EventEmitter<any> = new EventEmitter();

  selectedOption = 'resource__title';

  clearEventSubscription: Subscription;

  searchOptions: Array<SearchOptionsInterface>;

  constructor(
    private statesService: StatesService,
    private subscriptionEvents: SubscriptionEvents,
    private searchService: SearchService,
    private ref: ChangeDetectorRef,
  ) {
    ref.detach();
    this.clearEventSubscription = this.subscriptionEvents.getClearEventSubject().subscribe(() => {
      this.onClearSearchString();
    });
    setInterval(() => {
      if (!this.ref['destroyed']) {
        this.ref.detectChanges();
      }
    }, 1);
  }

  onClearSearchString() {
    if (this.searchValue !== undefined) {
      this.searchValue.nativeElement.value = '';
    }
  }

  onChangeSelectMode(value: string){
    this.selectedOption = value;
  }

  onSearch(searchData: NgForm){
    this.search.emit(searchData['_directives']);
  }

  ngOnInit(): void {
    this.onClearSearchString();
    this.searchService.getSearchOptions().subscribe(data => {
      this.searchOptions = data;
    });
  }
}
