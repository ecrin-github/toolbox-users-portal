import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ResourceInterface} from '../../_portal/core/interfaces/entities/resource.interface';
import {StatesService} from '../../_portal/core/services/state/states.service';
import {QueryApiService} from '../../_portal/core/services/query-api/query-api.service';


@Component({
  templateUrl: './resource-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourcePageComponent implements OnInit {

  public resourceId: number;
  public isLoading: boolean;

  public resource: ResourceInterface;

  public showMore: boolean;

  constructor(
    private route: Router,
    private activeRoute: ActivatedRoute,
    private queryApiService: QueryApiService,
    private statesService: StatesService,
    private ref: ChangeDetectorRef,
  ) {
    ref.detach();
    this.activeRoute.params.subscribe(
      (params: Params) => {
        this.resourceId = +params['id'];
      }
    );
    this.isLoading = true;
    this.showMore = false;
    this.queryApiService.getByResourceId({id: this.resourceId}).subscribe(data => {
        if (data !== null && data !== undefined && Object.keys(data).length > 0) {
          this.resource = data;
          this.statesService.singleResource = data;
        } else {
          this.resource = null;
        }
        this.isLoading = false;
      },
      error => {
        this.route.navigate(['error/not-found']);
      });
    setInterval(() => {
      if (!this.ref['destroyed']) {
        this.ref.detectChanges();
      }
    }, 1);
  }

  showMoreToggle(){
    return this.showMore = !this.showMore;
  }

  ngOnInit(): void {
  }

}
