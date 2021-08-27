import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';
import {SubscriptionEvents} from '../../../../core/states/subscription-events';
import {StatesService} from '../../../../core/services/state/states.service';


@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
})
export class SearchPanelComponent implements OnInit {

  @ViewChild('searchValue') searchValue: any;

  @Output() search: EventEmitter<any> = new EventEmitter();

  selectedOption = 'title';

  clearEventSubscription: Subscription;
  sessionUploadEvent: Subscription;

  constructor(
    private statesService: StatesService,
    private subscriptionEvents: SubscriptionEvents,
    private ref: ChangeDetectorRef,
  ) {
    ref.detach();
    this.clearEventSubscription = this.subscriptionEvents.getClearEventSubject().subscribe(() => {
      this.onClearSearchString();
    });
    this.sessionUploadEvent = this.subscriptionEvents.getSessionUploadingEvent().subscribe(() => {
      this.onSessionUpload();
    });
    setInterval(() => {
      if (!this.ref['destroyed']) {
        this.ref.detectChanges();
      }
    }, 1);
  }

  onSessionUpload() {
    const formData = this.statesService.activeSession;

    if (formData.searchType !== null && formData.searchType !== undefined) {
      if (formData.searchValue !== null && formData.searchValue !== undefined) {
        if (formData.searchValue !== ''){
          this.searchValue.nativeElement.value = formData.searchValue;
        }
      }
    }

  }

  onClearSearchString() {
    this.searchValue.nativeElement.value = '';
  }

  onChangeSelectMode(value: string){
    this.selectedOption = value;
  }

  onSearch(searchData: NgForm){
    this.search.emit(searchData['_directives']);
  }

  ngOnInit(): void {
    this.onClearSearchString();
  }
}
