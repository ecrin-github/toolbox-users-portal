import {TagsInterface} from './tags.interface';


interface TypeOfResourceInterface {
    name: string;
    description: string;
}


export interface ResourceInterface {
    id: number;
    title: string;
    abstract: string;
    authors: string;
    year_of_publication: number;
    doi: string;
    language: string;
    type_of_resource: string | null;
    url: string;
    resource_file: string;
    tags: TagsInterface | null;
    created: string;
    updated: string;
}
