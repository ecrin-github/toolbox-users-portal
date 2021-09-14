import {FiltersListInterface} from '../filters/filter.interface';

export interface SearchTypeInterface {
    id: number;
    name: string;
    appName: string;
    modelName: string;
    propertyName: string;
}

export interface RequestBodyInterface {
    page?: number;
    size?: number;
    searchType: SearchTypeInterface;
    searchValue: string;
    filters?: FiltersListInterface;
}
