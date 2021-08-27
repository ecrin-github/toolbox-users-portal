import {States} from '../../states/states';
import {Injectable} from '@angular/core';
import {FilterInterface} from '../../interfaces/filters/filter.interface';


@Injectable({providedIn: 'root'})
export class FiltersBuilderService {

  filtersList: Array<FilterInterface>;

  constructor(
    private states: States
  ) {
    this.states.filtersList.subscribe(value => this.filtersList = value);
  }

}

