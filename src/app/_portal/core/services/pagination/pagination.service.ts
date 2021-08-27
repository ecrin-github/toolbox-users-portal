import {Injectable} from '@angular/core';
import {QueryApiService} from '../query-api/query-api.service';
import {RequestBodyInterface} from '../../interfaces/requests/request-body.interface';


@Injectable({providedIn: 'root'})
export class PaginationService {

    constructor(
        private queryApiService: QueryApiService
    ) {
    }


    pagination(searchParams: RequestBodyInterface) {

        if (searchParams.searchType.name !== null && searchParams.searchType.name !== undefined) {

            if (searchParams.searchValue !== null && searchParams.searchValue !== undefined) {

                return this.queryApiService.getResources(searchParams);

            }

        } else {
            return null;
        }
    }

    onPageChecker(total: number, pageIndex: number, pageSize: number): number {
        let onPage = pageSize * (pageIndex + 1);
        if (total < onPage) {
            onPage = total;
        }
        return onPage;
    }

    startFromChecker(onPage: number, pageSize: number): number {
        let startFrom = onPage - pageSize + 1;
        if (startFrom < 0) {
            startFrom = 1;
        }
        return startFrom;
    }

}
