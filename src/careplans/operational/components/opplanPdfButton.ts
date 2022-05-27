import {WebComponent} from '@vetprovieh/vetprovieh-shared';
import {PdfButton} from '../../../shared';
import {OperationPlansRepository} from '../repository';

// eslint-disable-next-line new-cap
@WebComponent({
  template: PdfButton.template,
  tag: 'opplan-pdf-button',
})
/**
 * Generate Measure as PDF
 */
export class MeasurePdfButton extends PdfButton {
  /**
   * Default-Constructor
   */
  constructor() {
    super(new OperationPlansRepository());
  }
}
