import {Injectable} from '@angular/core';
import {environment} from '../../../../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {SearchOptionsInterface} from '../../interfaces/search/search-options.interface';


@Injectable({providedIn: 'root'})
export class SearchService {

    private urlString = environment.hostname + environment.apiBaseUrl + environment.apiVersion + environment.searchOptionsApiUrl;

    constructor(
        private http: HttpClient
    ) {
    }

    getSearchOptions(){
        return this.http.get<Array<SearchOptionsInterface>>(this.urlString);
    }

}
