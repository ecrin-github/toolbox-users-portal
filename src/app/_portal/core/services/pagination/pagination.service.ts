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

    endOnPageChecker(total: number, pageIndex: number, pageSize: number): number {
        let endOnPage = pageSize * (pageIndex + 1);
        if (total < endOnPage) {
            endOnPage = total;
        }
        return endOnPage;
    }

    lastPageChecker(total: number, pageSize: number, page: number) {
        return (pageSize * page) > total;
    }

    startOnPageChecker(total: number, pageIndex: number, pageSize: number): number {
        let startFrom = 1;
        const currentPage = pageIndex + 1;
        if (pageIndex !== 0) {
            if (this.lastPageChecker(total, pageSize, currentPage)) {
                startFrom = currentPage * pageSize;
                if ((startFrom - total) > 1) {
                    startFrom = (startFrom + 1) - pageSize;
                }
            } else {
                startFrom = pageIndex * pageSize + 1;
            }
        }
        return startFrom;
    }

}
