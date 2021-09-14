import {Injectable} from '@angular/core';
import {States} from '../../states/states';
import {DefaultStates} from '../../states/default.states';
import {RequestBodyInterface} from '../../interfaces/requests/request-body.interface';
import {FilterGroupInterface, FilterInterface} from '../../interfaces/filters/filter.interface';
import {ResourceInterface} from '../../interfaces/entities/resource.interface';


@Injectable({providedIn: 'root'})
export class StatesService {

  constructor(
    public states: States,
    public defaultStates: DefaultStates
  ) {
  }

  // IsCleared
  get isCleared() {
    return this.states.isCleared.getValue();
  }

  set isCleared(value: boolean) {
    this.states.isCleared.next(value);
  }

  setDefaultIsCleared() {
    this.isCleared = this.defaultStates.defaultIsCleared;
  }


  // IsFiltered
  get isFiltered() {
    return this.states.isFiltered.getValue();
  }

  set isFiltered(value: boolean) {
    this.states.isFiltered.next(value);
  }

  setDefaultIsFiltered() {
    this.isFiltered = this.defaultStates.defaultIsFiltered;
  }


  // SearchParams
  get searchParams() {
    return this.states.searchParams.getValue();
  }

  set searchParams(value: RequestBodyInterface) {
    this.states.searchParams.next(value);
  }

  setDefaultSearchParams() {
    this.searchParams = this.defaultStates.defaultSearchParams;
  }


  // FiltersList
  get filtersList() {
    return this.states.filtersList.getValue();
  }

  set filtersList(filters: Array<FilterInterface>) {
    this.states.filtersList.next(filters);
  }

  setDefaultFiltersList() {
    this.filtersList = this.defaultStates.defaultFiltersList;
  }


  // Single Resource
  get singleResource() {
    return this.states.singleResource.getValue();
  }

  set singleResource(resource: ResourceInterface) {
    this.states.singleResource.next(resource);
  }

  setDefaultSingleResource() {
    this.singleResource = this.defaultStates.defaultSingleResource;
  }


  // Categories
  get categoriesList() {
    return this.states.categoriesList.getValue();
  }

  set categoriesList(categories: Array<FilterGroupInterface>) {
    this.states.categoriesList.next(categories);
  }

  setDefaultCategoriesList(){
    this.states.categoriesList.next(this.defaultStates.defaultCategoriesList);
  }


  // Additional
  clearSearchAndUpload() {
    this.states.isFiltered.next(false);
    this.states.isCleared.next(true);
    this.setDefaultFiltersList();
    this.setDefaultSearchParams();
  }

  clearFilters() {
    this.states.isFiltered.next(false);
    this.setDefaultFiltersList();
  }

}
