export interface SearchTypeInterface {
    id: number;
    name: string;
    appName: string;
    modelName: string;
}

export interface RequestBodyInterface {
    page?: number;
    size?: number;
    searchType: SearchTypeInterface;
    searchValue: string;
    filters?: Array<object>;
}
