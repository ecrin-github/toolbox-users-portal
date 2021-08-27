import {SearchTypeInterface} from '../requests/request-body.interface';

export interface SessionDataInterface {
  searchType: SearchTypeInterface;
  searchValue: string;
  filters?: Array<any>;
}

export interface SessionRecordInterface {
  id: number;
  name: string;
  data: SessionDataInterface;
}
