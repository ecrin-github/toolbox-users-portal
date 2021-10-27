export interface ChildFilterInterface {
    id: number;
    modelPropertyName: string;
    resourcePropertyName: string;
    name: string;
    isSelected: boolean;
}

export interface FilterInterface extends ChildFilterInterface {
    value?: string;
    children?: Array<ChildFilterInterface>;
}

export interface FilterGroupInterface {
    id: number;
    isSelected: boolean;
    appName: string;
    modelName: string;
    name: string;
    hasChildren: boolean;
    filters: Array<FilterInterface>;
}


export interface FiltersListInterface {
    sensitive_data__id__in: Array<number>;
    resource_type__id__in: Array<number>;
    research_field__id__in: Array<number>;
    stage_in_ds__id__in: Array<number>;
    specific_topics__id__in: Array<number>;
    data_type__id__in: Array<number>;
    geographical_scope__id__in: Array<number>;
    resource__type_of_resource__id__in: Array<number>;
    countries_grouping__id__in: Array<number>;
    data_type_subs__id__in: Array<number>;
    resource__year_of_publication__gte: number;
    resource__year_of_publication__lte: number;
    resource__year_of_publication__in: Array<number>;
}



