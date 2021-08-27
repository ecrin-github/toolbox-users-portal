import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ResourceInterface} from '../../_portal/core/interfaces/entities/resource.interface';



@Component({
  templateUrl: './study-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourcePageComponent implements OnInit {

  public studyId: number;

  public resource: ResourceInterface;

  constructor(
    private route: Router,
    private activeRoute: ActivatedRoute,
    // private queryApiService: QueryApiService,
    // private statesService: StatesService,
    private ref: ChangeDetectorRef,
  ) {
    ref.detach();
    this.activeRoute.params.subscribe(
      (params: Params) => {
        this.studyId = +params['id'];
      }
    );
    /*this.queryApiService.getByStudyId({studyId: this.studyId}).subscribe(data => {
        this.resource = data[0];
        this.statesService.singleStudy = data[0];
      },
      error => {
        this.route.navigate(['error/not-found']);
      });
    setInterval(() => {
      if (!this.ref['destroyed']) {
        this.ref.detectChanges();
      }
    }, 1);*/
  }

  ngOnInit(): void {}

}
