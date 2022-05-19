import {WebComponent} from '@tomuench/vetprovieh-shared/lib';
import {PdfButton} from '../../shared';
import {MeasuresRepository} from '../repository';

// eslint-disable-next-line new-cap
@WebComponent({
  template: PdfButton.template,
  tag: 'measure-pdf-button',
})
/**
 * Measure-PDF Button
 */
export class MeasurePdfButton extends PdfButton {
  /**
   * Default-Constructor
   */
  constructor() {
    super(new MeasuresRepository());
  }
}
