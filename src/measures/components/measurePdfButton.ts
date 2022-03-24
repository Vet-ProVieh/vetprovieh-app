import {WebComponent} from '@tomuench/vetprovieh-shared/lib';
import {PdfButton} from '../../shared';
import {MeasuresRepository} from '../repository';

// eslint-disable-next-line new-cap
@WebComponent({
  template: PdfButton.template,
  tag: 'measure-pdf-button',
})
export class MeasurePdfButton extends PdfButton {
  constructor() {
    super(new MeasuresRepository());
  }
}
