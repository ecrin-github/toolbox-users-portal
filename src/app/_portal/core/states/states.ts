import {BehaviorSubject} from 'rxjs';
import {DefaultStates} from './default.states';
import {Injectable} from '@angular/core';
import {SessionDataInterface, SessionRecordInterface} from '../interfaces/states/session.interface';
import {ResourceInterface} from '../interfaces/entities/resource.interface';
import {FilterInterface} from '../interfaces/filters/filter.interface';
import {RequestBodyInterface} from '../interfaces/requests/request-body.interface';


@Injectable({providedIn: 'root'})
export class States {

  constructor(
    private defaultStates: DefaultStates
  ) {
  }

  public isCleared: BehaviorSubject<boolean> =
      new BehaviorSubject<boolean>(this.defaultStates.defaultIsCleared);

  public isFiltered: BehaviorSubject<boolean> =
      new BehaviorSubject<boolean>(this.defaultStates.defaultIsFiltered);

  public searchParams: BehaviorSubject<RequestBodyInterface> =
      new BehaviorSubject<RequestBodyInterface>(this.defaultStates.defaultSearchParams);

  public filtersList: BehaviorSubject<Array<FilterInterface>> =
      new BehaviorSubject<Array<FilterInterface>>(this.defaultStates.defaultFiltersList);

  public singleStudy: BehaviorSubject<ResourceInterface> =
      new BehaviorSubject<ResourceInterface>(this.defaultStates.defaultSingleStudy);

  public activeSession: BehaviorSubject<SessionDataInterface> =
      new BehaviorSubject<SessionDataInterface>(this.defaultStates.defaultActiveSession);

  public sessionsList: BehaviorSubject<Array<SessionRecordInterface>> =
      new BehaviorSubject<Array<SessionRecordInterface>>(this.defaultStates.defaultSessionsList);

}
