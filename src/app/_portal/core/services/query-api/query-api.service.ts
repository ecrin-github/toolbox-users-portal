import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseInterface } from '../../interfaces/responses/server-response.interface';
import { environment } from '../../../../../environments/environment.prod';
import {RequestBodyInterface} from '../../interfaces/requests/request-body.interface';
import {ResourceRequestInterface} from '../../interfaces/requests/resource-request.interface';
import {ResourceInterface} from '../../interfaces/entities/resource.interface';


@Injectable({providedIn: 'root'})
export class QueryApiService {

  baseUrlApi: string = environment.hostname + environment.apiBaseUrl + environment.apiVersion;

  private searchQueryUrl = this.baseUrlApi + environment.searchApiUrl;
  private selectedResourceApiUrl = this.baseUrlApi + environment.resourceIdUrl;

  constructor(
    private http: HttpClient
  ) {
  }

  getResources(searchParams: RequestBodyInterface){
    return this.http.post<ResponseInterface>(this.searchQueryUrl, searchParams);
  }

  getByResourceId(searchParams: ResourceRequestInterface){
    return this.http.post<ResourceInterface>(this.selectedResourceApiUrl, searchParams);
  }

}
