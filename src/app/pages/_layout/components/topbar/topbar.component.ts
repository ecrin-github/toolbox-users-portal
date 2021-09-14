import {Component, OnInit, AfterViewInit, ChangeDetectorRef} from '@angular/core';
import { LayoutService } from '../../../../_portal/core';
import KTLayoutQuickPanel from '../../../../../assets/js/layout/extended/quick-panel';
import KTLayoutHeaderTopbar from '../../../../../assets/js/layout/base/header-topbar';
import { KTUtil } from '../../../../../assets/js/components/util';
import {StatesService} from '../../../../_portal/core/services/state/states.service';
import {SubscriptionEvents} from '../../../../_portal/core/states/subscription-events';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SnackbarService} from '../../../../_portal/core/services/snackbar/snackbar.service';
import {ResponseInterface} from '../../../../_portal/core/interfaces/responses/server-response.interface';
import {QueryApiService} from '../../../../_portal/core/services/query-api/query-api.service';
import {FiltersBuilderService} from '../../../../_portal/core/services/filters-builder/filters-builder.service';
import {PdfService} from '../../../../_portal/core/services/portal/pdf.service';
import {FileSaverService} from 'ngx-filesaver';


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
    private queryApiService: QueryApiService,
    private filtersBuilder: FiltersBuilderService,
    private fileSaver: FileSaverService,
    private pdfService: PdfService,
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

    this.statesService.setDefaultSearchParams();

    this.statesService.setDefaultFiltersList();

    this.subscriptionEvents.sendClearEvent();

    this.snackbarService.snackbarTranslateMessage('SNACKBAR.CLEAR.MESSAGE', 'SNACKBAR.CLOSE');

  }


  generateJson() {
    if (!this.statesService.isCleared) {
      let filename: string;
      filename = 'Session Storage - ' + Date.now() + '.json';

      const searchParams = this.statesService.searchParams;
      searchParams.page = null;
      searchParams.size = null;
      searchParams.filters = this.filtersBuilder.filtersBuilder();

      this.queryApiService.getResources(searchParams).subscribe(
          (data: ResponseInterface) => {
            const fileType = this.fileSaver.genType(filename);
            const blob = new Blob([JSON.stringify(data.data)], {type: fileType});
            this.fileSaver.save(blob, filename);
          });
    } else {
      this.snackbarService.snackbarTranslateMessage('MODALS.MESSAGES.EMPTY-SESSION', 'SNACKBAR.CLOSE');
    }
  }

  generatePdf(){
    if (!this.statesService.isCleared) {

      const searchParams = this.statesService.searchParams;
      searchParams.page = null;
      searchParams.size = null;
      searchParams.filters = this.filtersBuilder.filtersBuilder();

      this.queryApiService.getResources(searchParams).subscribe(
          (data: ResponseInterface) => {
            this.pdfService.multipleResourcesPDFGenerator(data.data);
          });
    } else {
      this.snackbarService.snackbarTranslateMessage('MODALS.MESSAGES.EMPTY-SESSION', 'SNACKBAR.CLOSE');
    }
  }


  generateResourceJson() {
    if (this.statesService.singleResource) {
      const filename = this.statesService.singleResource.title + '.json';
      const fileType = this.fileSaver.genType(filename);
      const blob = new Blob([JSON.stringify(this.statesService.singleResource)], {type: fileType});
      this.fileSaver.save(blob, filename);
    } else {
      this.snackbarService.snackbarTranslateMessage('MODALS.MESSAGES.NO-STUDY', 'SNACKBAR.CLOSE');
    }
  }

  generateResourcePdf(){
    if (this.statesService.singleResource) {
      this.pdfService.singleResourcePDFGenerator(this.statesService.singleResource);
    } else {
      this.snackbarService.snackbarTranslateMessage('MODALS.MESSAGES.NO-STUDY', 'SNACKBAR.CLOSE');
    }
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
