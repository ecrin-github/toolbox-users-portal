import {BehaviorSubject} from 'rxjs';
import {DefaultStates} from './default.states';
import {Injectable} from '@angular/core';
import {ResourceInterface} from '../interfaces/entities/resource.interface';
import {FilterGroupInterface, FilterInterface, FiltersListInterface} from '../interfaces/filters/filter.interface';
import {RequestBodyInterface} from '../interfaces/requests/request-body.interface';


@Injectable({providedIn: 'root'})
export class States {

  constructor(
    private defaultStates: DefaultStates
  ) {
  }

  public isCleared: BehaviorSubject<boolean> =
      new BehaviorSubject<boolean>(this.defaultStates.defaultIsCleared);

  public isFiltered: BehaviorSubject<boolean> =
      new BehaviorSubject<boolean>(this.defaultStates.defaultIsFiltered);

  public searchParams: BehaviorSubject<RequestBodyInterface> =
      new BehaviorSubject<RequestBodyInterface>(this.defaultStates.defaultSearchParams);

  public categoriesList: BehaviorSubject<Array<FilterGroupInterface>> =
      new BehaviorSubject<Array<FilterGroupInterface>>(this.defaultStates.defaultCategoriesList);

  public filtersList: BehaviorSubject<Array<FilterInterface>> =
      new BehaviorSubject<Array<FilterInterface>>(this.defaultStates.defaultFiltersList);

  public singleResource: BehaviorSubject<ResourceInterface> =
      new BehaviorSubject<ResourceInterface>(this.defaultStates.defaultSingleResource);

}
