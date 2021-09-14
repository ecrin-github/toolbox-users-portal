import {Component, Input, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {SubscriptionEvents} from '../../../../../core/states/subscription-events';
import {FilterInterface} from '../../../../../core/interfaces/filters/filter.interface';
import {SnackbarService} from '../../../../../core/services/snackbar/snackbar.service';
import {StatesService} from '../../../../../core/services/state/states.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
})
export class CategoriesComponent implements OnInit {

  constructor(
    private snackbarService: SnackbarService,
    private translate: TranslateService,
    private statesService: StatesService,
    private subscriptionEvents: SubscriptionEvents,
  ) {
  }

  @Input() categoryId: number;
  @Input() modelName: string;
  @Input() appName: string;
  @Input() name: string;
  @Input() isSelected: boolean;
  @Input() filters: Array<FilterInterface>;


  onCategoryFilter(
      event, name: string,
      id: number,
      modelPropertyName: string,
      resourcePropertyName: string,
      isSelected: boolean,
  ){

    let message = '';
    const close = 'Close';

    if (event.checked === false) {

      message = 'Deselected filter: ';

      this.snackbarService.snackbarMessage(message + name, close);

      this.statesService.filtersList.splice(
          this.statesService.filtersList.findIndex(
              x => x.name === name && x.id === id
          ), 1
      );

      this.statesService.isFiltered = this.statesService.filtersList.length > 0;

      this.subscriptionEvents.sendFilterEvent();

    } else {

      message = 'Selected filter: ';

      this.snackbarService.snackbarMessage(message + name, close);

      const indx = this.statesService.filtersList.findIndex(x => x.id === id && x.name === name);

      if (indx <= -1) {
        this.statesService.filtersList.push({
          id,
          modelPropertyName,
          resourcePropertyName,
          name,
          isSelected,
        });
      }

      this.statesService.isFiltered = this.statesService.filtersList.length > 0;

      this.subscriptionEvents.sendFilterEvent();

    }
  }

  selectAll(name: string){

    const groupTranslateName = name;
    const message = 'Selected all filters from the category: ';
    const close = 'Close';

    this.filters.forEach(element => {
      element.isSelected = true;

      // tslint:disable-next-line:no-shadowed-variable
      const id = element.id;
      const modelPropertyName = element.modelPropertyName;
      const resourcePropertyName = element.resourcePropertyName;
      // tslint:disable-next-line:no-shadowed-variable
      const name = element.name;
      const isSelected = element.isSelected;

      if (!this.statesService.filtersList.some(x => x.id === id && x.name === name)) {
        this.statesService.filtersList.push({
          id,
          modelPropertyName,
          resourcePropertyName,
          name,
          isSelected,
        });
      }
    });

    this.statesService.isFiltered = this.statesService.filtersList.length > 0;

    this.subscriptionEvents.sendFilterEvent();

    this.snackbarService.snackbarMessage(message + groupTranslateName, close);

  }


  deselectAll(name: string){

    const groupTranslateName = name;
    const message = 'Deselected all filters from the category: ';
    const close = 'Close';

    this.filters.forEach(element => {
      element.isSelected = false;

      const indx = this.statesService.filtersList.findIndex(x => x.id === element.id && x.name === element.name);
      if (indx > -1) {
        this.statesService.filtersList.splice(indx, 1);
      }
    });

    this.statesService.isFiltered = this.statesService.filtersList.length > 0;

    this.subscriptionEvents.sendFilterEvent();

    this.snackbarService.snackbarMessage(message + groupTranslateName, close);

  }

  isExpandedProperty(name): boolean {
    return !(name === 'Countries' || name === 'Data subtypes');
  }

  ngOnInit(): void {
  }
}
