import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {StatesService} from '../../../core/services/state/states.service';
import {SubscriptionEvents} from '../../../core/states/subscription-events';
import {PageEvent} from '@angular/material/paginator';
import {Observable, Subscription} from 'rxjs';
import {FiltersListComponent} from './filters-list/filters-list.component';
import {ResponseInterface} from '../../../core/interfaces/responses/server-response.interface';
import {ResourceInterface} from '../../../core/interfaces/entities/resource.interface';
import {SnackbarService} from '../../../core/services/snackbar/snackbar.service';
import {QueryApiService} from '../../../core/services/query-api/query-api.service';
import {PaginationService} from '../../../core/services/pagination/pagination.service';
import {RequestBodyInterface, SearchTypeInterface} from '../../../core/interfaces/requests/request-body.interface';
import {SearchService} from '../../../core/services/portal/search.service';
import {SearchOptionsInterface} from '../../../core/interfaces/search/search-options.interface';
import {FiltersBuilderService} from '../../../core/services/filters-builder/filters-builder.service';


@Component({
  selector: 'app-main-page-content',
  templateUrl: './main-page-content.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageContentComponent implements OnInit {

  public fetchedData: Array<any>;

  public loading: boolean;

  public total: number;
  public startOnPage: number;
  public endOnPage: number;

  public pageSize: number;
  public pageIndex: number;
  public pageSizeOptions = [5, 10, 15, 20];
  public pageSlice: Array<ResourceInterface> = [];

  public searchOptions: Array<SearchOptionsInterface>;
  public requestBody: RequestBodyInterface;
  public searchType: SearchTypeInterface;
  public searchValue: string;

  clearEventSubscription: Subscription;
  isFilteredEventSubscription: Subscription;
  clearFilterEventSubscription: Subscription;

  constructor(
    private route: Router,
    private snackbarService: SnackbarService,
    private ref: ChangeDetectorRef,
    private statesService: StatesService,
    private subscriptionEvents: SubscriptionEvents,
    private queryApiService: QueryApiService,
    private filtersListComponent: FiltersListComponent,
    private paginationService: PaginationService,
    private searchService: SearchService,
    private filtersBuilder: FiltersBuilderService
  ) {
    ref.detach();
    this.clearEventSubscription = this.subscriptionEvents.getClearEventSubject().subscribe(() => {
      this.onClearData();
    });
    this.isFilteredEventSubscription = this.subscriptionEvents.getFilterEventSubject().subscribe(() => {
      this.getFilteredData();
    });
    this.clearFilterEventSubscription = this.subscriptionEvents.getClearFilterEvent().subscribe(() => {
      if (!this.statesService.isCleared) {
        this.onClearFiltersListener();
      }
    });
    setInterval(() => {
      if (!this.ref['destroyed']) {
        this.ref.detectChanges();
      }
    }, 1);
  }

  onClearBeforeSearch() {

    this.filtersListComponent.clearAll();

    this.fetchedData = [];
    this.pageSlice = [];
    this.total = undefined;
    this.pageSize = 10;
    this.pageIndex = 0;
    this.loading = false;

  }

  showSearchResults(searchResults: Observable<any>){
    this.loading = true;
    if (searchResults !== null && searchResults !== undefined) {
      searchResults.subscribe(
        (data: ResponseInterface) => {
          this.pageSlice = data.data;
          this.total = data.total;
          this.endOnPage = this.paginationService.endOnPageChecker(this.total, this.pageIndex, this.pageSize);
          this.startOnPage = this.paginationService.startOnPageChecker(this.total, this.pageIndex, this.pageSize);
          this.loading = false;
        },
        error => {
          this.route.navigate(['error/server-error']);
        }
      );
    }
  }

  onSearch($event: any){

    this.statesService.clearSearchAndUpload();
    this.onClearBeforeSearch();

    this.searchType = $event[0]['model'];

    this.statesService.isCleared = false;
    this.loading = true;

    if (!this.statesService.isCleared) {

      this.searchType = this.searchOptions.find(x => x.propertyName === $event[0]['viewModel']);
      this.searchValue = $event[1]['viewModel'];

      this.requestBody = {
        page: this.pageIndex + 1,
        size: this.pageSize,
        searchType: this.searchType,
        searchValue: this.searchValue.trim(),
        filters: this.filtersBuilder.filtersBuilder()
      };

      this.statesService.searchParams = this.requestBody;

      this.showSearchResults(this.paginationService.pagination(this.requestBody));

    } else {

      this.onClearBeforeSearch();
      this.pageIndex = 0;
      this.pageSize = 10;

      this.snackbarService.snackbarTranslateMessage('SNACKBAR.SEARCH.ERROR-MESSAGE',
          'SNACKBAR.CLOSE');
    }

    if (this.searchValue === null || this.searchValue === undefined) {

      this.onClearBeforeSearch();
      this.pageIndex = 0;
      this.pageSize = 10;

      this.snackbarService.snackbarTranslateMessage('SNACKBAR.SEARCH.ERROR-MESSAGE',
          'SNACKBAR.CLOSE');

    }
  }

  getFilteredData(){

    this.pageIndex = 0;
    this.pageSize = 10;

    if (!this.statesService.isCleared) {

      this.requestBody = {
        page: this.pageIndex + 1,
        size: this.pageSize,
        searchType: this.searchType,
        searchValue: this.searchValue.trim(),
        filters: this.filtersBuilder.filtersBuilder()
      };

      this.showSearchResults(this.paginationService.pagination(this.requestBody));

    }
  }

  onClearFiltersListener(){

    this.statesService.filtersList = [];
    this.statesService.isFiltered = false;
    this.pageIndex = 0;
    this.pageSize = 10;

    this.requestBody = {
      page: this.pageIndex + 1,
      size: this.pageSize,
      searchType: this.searchType,
      searchValue: this.searchValue.trim(),
      filters: this.filtersBuilder.filtersBuilder()
    };

    if (!this.statesService.isCleared) {
      this.showSearchResults(this.paginationService.pagination(this.requestBody));
    }
  }


  setInitialSearchParams() {
    this.pageIndex = 0;
    this.pageSize = 10;
    this.loading = false;
    this.fetchedData = [];
    this.pageSlice = [];
    this.total = undefined;
    this.searchType = null;
    this.requestBody = null;
  }


  onClearData() {

    this.setInitialSearchParams();

    this.statesService.isCleared = true;
    this.statesService.isFiltered = false;
    this.statesService.filtersList = [];

    this.statesService.clearFilters();
    this.filtersListComponent.clearAll();

  }

  onPageChange(event: PageEvent){

    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;

    if (!this.statesService.isCleared) {

      this.requestBody = {
        page: this.pageIndex + 1,
        size: this.pageSize,
        searchType: this.searchType,
        searchValue: this.searchValue.trim(),
        filters: this.filtersBuilder.filtersBuilder()
      };

      this.showSearchResults(this.paginationService.pagination(this.requestBody));

    }
  }

  ngOnInit(): void {
    this.setInitialSearchParams();
    // set search options
    this.searchService.getSearchOptions().subscribe(data => {
      this.searchOptions = data;
    });
  }
}
