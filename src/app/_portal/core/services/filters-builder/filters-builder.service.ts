import {Injectable} from '@angular/core';
import {FiltersListInterface} from '../../interfaces/filters/filter.interface';
import {StatesService} from '../state/states.service';


@Injectable({providedIn: 'root'})
export class FiltersBuilderService {

  exceptionFiltersArray: FiltersListInterface;

  constructor(
    private statesService: StatesService
  ) {
  }

  filtersBuilder(): FiltersListInterface {
    this.exceptionFiltersArray = {
      sensitive_data__id__in: [],
      resource_type__id__in: [],
      research_field__id__in: [],
      stage_in_ds__id__in: [],
      specific_topics__id__in: [],
      data_type__id__in: [],
      geographical_scope__id__in: [],
      resource__type_of_resource__id__in: [],
      countries_grouping__id__in: [],
      data_type_subs__id__in: [],
      resource__year_of_publication__gte: 0,
      resource__year_of_publication__lte: 0,
      resource__year_of_publication__in: []
    };

    if (this.statesService.filtersList !== null && this.statesService.filtersList !== undefined) {
      if (this.statesService.filtersList.length > 0) {
        for (const filter of this.statesService.filtersList) {

          if (filter.resourcePropertyName === 'year_of_publication_gt') {
            if (filter.value !== null && filter.value !== undefined) {
              const valCheck = filter.value.trim();
              if (valCheck !== '') {
                const yearVals = filter.value;
                const valsArray = yearVals.split(' ');
                if (valsArray.length >= 1) {
                  this.exceptionFiltersArray.resource__year_of_publication__gte = Number(valsArray[0]);
                }
              }
            }
          }

          if (filter.resourcePropertyName === 'year_of_publication_lt') {
            if (filter.value !== null && filter.value !== undefined) {
              const valCheck = filter.value.trim();
              if (valCheck !== '') {
                const yearVals = filter.value;
                const valsArray = yearVals.split(' ');
                if (valsArray.length >= 1) {
                  this.exceptionFiltersArray.resource__year_of_publication__lte = Number(valsArray[0]);
                }
              }
            }
          }

          if (filter.resourcePropertyName === 'year_of_publication_in') {
            if (filter.value !== null && filter.value !== undefined) {
              const valCheck = filter.value.trim();
              if (valCheck !== '') {
                const yearVals = filter.value;
                const valsArray = yearVals.split(' ');
                for (const year of valsArray) {
                  const yearVal = Number(year);
                  if (!this.exceptionFiltersArray.resource__year_of_publication__in.includes(yearVal)) {
                    this.exceptionFiltersArray.resource__year_of_publication__in.push(yearVal);
                  }
                }
              }
            }
          }

          if (filter.resourcePropertyName === 'sensitive_data') {
            this.exceptionFiltersArray.sensitive_data__id__in.push(filter.id);
          }

          if (filter.resourcePropertyName === 'data_type_subs') {
            this.exceptionFiltersArray.data_type_subs__id__in.push(filter.id);
          }

          if (filter.resourcePropertyName === 'countries_grouping') {
            this.exceptionFiltersArray.countries_grouping__id__in.push(filter.id);
          }

          if (filter.resourcePropertyName === 'type_of_resource') {
            this.exceptionFiltersArray.resource__type_of_resource__id__in.push(filter.id);
          }

          if (filter.resourcePropertyName === 'resource_type') {
            this.exceptionFiltersArray.resource_type__id__in.push(filter.id);
          }

          if (filter.resourcePropertyName === 'research_field') {
            this.exceptionFiltersArray.research_field__id__in.push(filter.id);
          }

          if (filter.resourcePropertyName === 'specific_topics') {
            this.exceptionFiltersArray.specific_topics__id__in.push(filter.id);
          }

          if (filter.resourcePropertyName === 'geographical_scope') {
            this.exceptionFiltersArray.geographical_scope__id__in.push(filter.id);
          }

          if (filter.resourcePropertyName === 'data_type') {
            this.exceptionFiltersArray.data_type__id__in.push(filter.id);
          }

          if (filter.resourcePropertyName === 'stage_in_ds') {
            this.exceptionFiltersArray.stage_in_ds__id__in.push(filter.id);
          }
        }
      }
    }
    return this.exceptionFiltersArray;
  }

}

