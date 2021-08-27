import {BaseResponseInterface} from './base-response.interface';
import {ResourceInterface} from '../entities/resource.interface';


export interface ResponseInterface extends BaseResponseInterface {
  data: Array<ResourceInterface> | [];
}
