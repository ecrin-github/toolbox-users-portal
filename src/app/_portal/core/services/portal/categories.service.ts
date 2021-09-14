import {Injectable} from '@angular/core';
import {environment} from '../../../../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {FilterGroupInterface} from '../../interfaces/filters/filter.interface';


@Injectable({providedIn: 'root'})
export class CategoriesService {

    private urlString = environment.hostname + environment.apiBaseUrl
        + environment.apiVersion + environment.categoriesApiUrl;

    constructor(
        private http: HttpClient
    ) {
    }

    getCategories(){
        return this.http.get<Array<FilterGroupInterface>>(this.urlString);
    }

}
