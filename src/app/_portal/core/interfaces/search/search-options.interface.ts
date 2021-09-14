import {SearchTypeInterface} from '../requests/request-body.interface';

export interface SearchOptionsInterface extends SearchTypeInterface{
    isDefault?: boolean;
}
