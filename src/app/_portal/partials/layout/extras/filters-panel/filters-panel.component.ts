import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { LayoutService } from '../../../../core';
import { States } from '../../../../core/states/states';
import {StatesService} from '../../../../core/services/state/states.service';
import {FilterGroupInterface} from '../../../../core/interfaces/filters/filter.interface';
import {CategoriesService} from '../../../../core/services/portal/categories.service';
import {FiltersBuilderService} from '../../../../core/services/filters-builder/filters-builder.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SnackbarService} from '../../../../core/services/snackbar/snackbar.service';
import {SubscriptionEvents} from '../../../../core/states/subscription-events';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-filters-panel',
  templateUrl: './filters-panel.component.html',
  styleUrls: ['./filters-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersPanelComponent implements OnInit {
  extrasFiltersPanelDirectionCSSClass = 'offcanvas-right';
  activeTabId:
    | 'categories';

  categories: Array<FilterGroupInterface>;

  form: FormGroup = new FormGroup({});

  clearFilterEventSubscription: Subscription;

  @ViewChild('publicationYearPrefix') publicationYearPrefix: ElementRef;
  @ViewChild('publicationYearValue') publicationYearValue: ElementRef;

  constructor(
    private layout: LayoutService,
    public states: States,
    private ref: ChangeDetectorRef,
    private statesService: StatesService,
    private categoriesService: CategoriesService,
    private snackbarService: SnackbarService,
    private subscriptionEvents: SubscriptionEvents,
    private fb: FormBuilder,
    private filtersBuilder: FiltersBuilderService,
  ) {
    ref.detach();

    this.form = fb.group({
      publicationYearPrefix: ['', [Validators.required]],
      publicationYearValue: ['', [Validators.required,
        Validators.pattern(/^(?=.*\d)[\d ]+$/)]]
    });

    this.clearFilterEventSubscription = this.subscriptionEvents.getClearFilterEvent().subscribe(() => {
      this.clearFormData();
    });

    setInterval(() => {
      if (!this.ref['destroyed']) {
        this.ref.detectChanges();
      }
    }, 1);
  }

  addPublicationYear() {

    const publicationYearPrefix = this.form.value.publicationYearPrefix;
    const publicationYearValue = this.form.value.publicationYearValue;

    let message = 'Publication year ';
    const close = 'Close';

    let resourcePropertyName = '';
    let modelPropertyName = '';

    if (publicationYearPrefix === 'equals') {

      message = message + 'is: ' + publicationYearValue;
      resourcePropertyName = 'year_of_publication_in';
      modelPropertyName = 'resource__year_of_publication__in';

    } else if (publicationYearPrefix === 'greater') {

      message = message + 'is greater than: ' + publicationYearValue;
      resourcePropertyName = 'year_of_publication_gt';
      modelPropertyName = 'resource__year_of_publication__gt';

    } else if (publicationYearPrefix === 'less') {

      message = message + 'is less than: ' + publicationYearValue;
      resourcePropertyName = 'year_of_publication_lt';
      modelPropertyName = 'resource__year_of_publication__lt';

    }

    let indx = 0;
    if (resourcePropertyName === 'year_of_publication_in') {
      indx = this.statesService.filtersList.findIndex(
          x => x.value === publicationYearValue
              && x.resourcePropertyName === resourcePropertyName
      );
    } else {
      indx = this.statesService.filtersList.findIndex(
          x => x.resourcePropertyName === resourcePropertyName
      );
    }

    if (indx <= -1) {

      const id = Math.floor(Math.random() * 999);

      this.statesService.filtersList.push({
        id,
        modelPropertyName,
        resourcePropertyName,
        value: publicationYearValue,
        name: message,
        isSelected: false,
      });

    } else {

      this.statesService.filtersList.splice(indx, 1);

      const id = Math.floor(Math.random() * 999);

      this.statesService.filtersList.push({
        id,
        modelPropertyName,
        resourcePropertyName,
        value: publicationYearValue,
        name: message,
        isSelected: false,
      });

    }

    this.snackbarService.snackbarMessage(message, close);

    this.statesService.isFiltered = this.statesService.filtersList.length > 0;
    this.subscriptionEvents.sendFilterEvent();

  }


  clearFormData() {
    if (this.publicationYearPrefix !== undefined && this.publicationYearValue !== undefined) {
      this.publicationYearPrefix.nativeElement.value = '';
      this.publicationYearValue.nativeElement.value = '';
    }
  }


  ngOnInit(): void {
    this.extrasFiltersPanelDirectionCSSClass = `offcanvas-${this.layout.getProp(
      'extras.filtersPanel.offcanvas.direction'
    )}`;
    this.categoriesService.getCategories().subscribe(data => {
      this.categories = data;
      this.statesService.categoriesList = data;
    });
  }

  setActiveTabId(tabId) {
    this.activeTabId = tabId;
  }

  getActiveCSSClasses(tabId) {
    if (tabId !== this.activeTabId) {
      return '';
    }
    return 'active show';
  }
}
