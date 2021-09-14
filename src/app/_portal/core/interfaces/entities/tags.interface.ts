interface ResourceTypeInterface {
    name: string;
    description: string;
}

interface ResearchFieldInterface {
    name: string;
    description: string;
}

interface SpecificTopicInterface {
    name: string;
    description: string;
}

interface GeographicalScopeInterface {
    name: string;
    description: string;
    countries_grouping: Array<string>;
}

interface DataTypeSub {
    name: string;
    description: string;
}

interface DataTypeInterface {
    name: string;
    description: string;
    subs: Array<DataTypeSub>;
}

interface StageInDsInterface {
    name: string;
    description: string;
}

export interface TagsInterface {
    resource_type: Array<ResourceTypeInterface>;
    research_field: Array<ResearchFieldInterface>;
    specific_topics: Array<SpecificTopicInterface>;
    geographical_scope: GeographicalScopeInterface;
    data_type: DataTypeInterface;
    stage_in_ds: StageInDsInterface;
}
