import {ResourceInterface} from '../interfaces/entities/resource.interface';
import {Injectable} from '@angular/core';
import {SessionDataInterface} from '../interfaces/states/session.interface';
import {RequestBodyInterface} from '../interfaces/requests/request-body.interface';


@Injectable({providedIn: 'root'})
export class DefaultStates {

  public defaultIsCleared = true;
  public defaultIsFiltered = false;

  public defaultSearchParams: RequestBodyInterface = {
    searchType: null,
    searchValue: null
  };

  public defaultFiltersList = [];

  public defaultSingleStudy: ResourceInterface;

  public defaultActiveSession: SessionDataInterface = {
    searchType: null,
    searchValue: null,
    filters: null
  };

  public defaultSessionsList = [];

}
