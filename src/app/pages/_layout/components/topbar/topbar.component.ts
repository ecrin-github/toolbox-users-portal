import {Component, OnInit, AfterViewInit, ChangeDetectorRef} from '@angular/core';
import { LayoutService } from '../../../../_portal/core';
import KTLayoutQuickPanel from '../../../../../assets/js/layout/extended/quick-panel';
import KTLayoutHeaderTopbar from '../../../../../assets/js/layout/base/header-topbar';
import { KTUtil } from '../../../../../assets/js/components/util';
import {StatesService} from '../../../../_portal/core/services/state/states.service';
import {SubscriptionEvents} from '../../../../_portal/core/states/subscription-events';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ExportModalComponent} from './modals/export-modal/export-modal.component';
import {SaveModalComponent} from './modals/save-modal/save-modal.component';
import {LoadModalComponent} from './modals/load-modal/load-modal.component';
import {SingleResourceExportModalComponent} from './modals/single-resource-export-modal/single-resource-export-modal.component';
import {SnackbarService} from '../../../../_portal/core/services/snackbar/snackbar.service';
import {RequestBodyInterface} from '../../../../_portal/core/interfaces/requests/request-body.interface';


@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit, AfterViewInit {

  extrasQuickPanelDisplay: boolean;
  extrasLanguagesDisplay: boolean;

  constructor(
    private statesService: StatesService,
    private subscriptionEvents: SubscriptionEvents,
    private layout: LayoutService,
    public router: Router,
    private modal: NgbModal,
    private ref: ChangeDetectorRef,
    private snackbarService: SnackbarService,
  ) {
    ref.detach();

    setInterval(() => {
      if (!this.ref['destroyed']) {
        this.ref.detectChanges();
      }
    }, 1);
  }


  onClear(){

    this.statesService.isCleared = true;

    // this.statesService.searchParams = {searchType, searchBody};

    this.subscriptionEvents.sendClearEvent();

    this.snackbarService.snackbarTranslateMessage('SNACKBAR.CLEAR.MESSAGE', 'SNACKBAR.CLOSE');

  }


  openExportModal() {
    this.modal.open(ExportModalComponent, {centered: true});
  }

  openLoadModal() {
    this.modal.open(LoadModalComponent, {centered: true});
  }

  openSaveModal() {
    this.modal.open(SaveModalComponent, {centered: true});
  }

  openSingleStudyModal() {
    this.modal.open(SingleResourceExportModalComponent, {centered: true});
  }


  ngOnInit(): void {
    this.extrasLanguagesDisplay = this.layout.getProp(
      'extras.languages.display'
    );
    this.extrasQuickPanelDisplay = this.layout.getProp(
      'extras.quickPanel.display'
    );
  }

  ngAfterViewInit(): void {
    KTUtil.ready(() => {
      // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
      // Add 'implements AfterViewInit' to the class.
      if (this.extrasQuickPanelDisplay) {
        // Init Quick Offcanvas Panel
        KTLayoutQuickPanel.init('kt_quick_panel');
      }
      // Init Header Topbar For Mobile Mode
      KTLayoutHeaderTopbar.init('kt_header_mobile_topbar_toggle');
    });
  }
}
