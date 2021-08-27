import {Component, OnInit} from '@angular/core';
import {PdfService} from '../../../../../../_portal/core/services/portal/pdf.service';
import {StatesService} from '../../../../../../_portal/core/services/state/states.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FileSaverService} from 'ngx-filesaver';
import {SnackbarService} from '../../../../../../_portal/core/services/snackbar/snackbar.service';


@Component({
  selector: 'app-single-resource-export-modal',
  templateUrl: './single-study-export-modal.component.html',
})
export class SingleResourceExportModalComponent implements OnInit {

  constructor(
    private pdfService: PdfService,
    private statesService: StatesService,
    private fileSaver: FileSaverService,
    public activeModal: NgbActiveModal,
    private snackbarService: SnackbarService,
  ) {
  }

  generateJson() {

    if (this.statesService.singleStudy) {

      const studyData = this.statesService.singleStudy;

      const filename = studyData.displayTitle + '.json';

      const fileType = this.fileSaver.genType(filename);
      const blob = new Blob([JSON.stringify(studyData)], {type: fileType});
      this.fileSaver.save(blob, filename);

      this.closeModal();

    } else {
      this.snackbarService.snackbarTranslateMessage('MODALS.MESSAGES.NO-STUDY', 'SNACKBAR.CLOSE');
    }
  }

  generatePdf(){

    if (this.statesService.singleStudy) {
      this.pdfService.singleStudyPDFGenerator(this.statesService.singleStudy);
      this.closeModal();
    } else {
      this.snackbarService.snackbarTranslateMessage('MODALS.MESSAGES.NO-STUDY', 'SNACKBAR.CLOSE');
    }
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  ngOnInit(): void {
  }

}
