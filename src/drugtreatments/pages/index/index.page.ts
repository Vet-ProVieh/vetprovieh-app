import {WebComponent} from '@tomuench/vetprovieh-shared/lib';
import {BasicIndexPage} from '../../../shared';
import { Drugtreatment } from '../../models';
import { DrugtreatmentRepository } from '../../repository';


@WebComponent({
  template: '',
  tag: 'vetprovieh-drugtreatments',
})
export class DrugstreatmentsIndexPage extends BasicIndexPage<Drugtreatment> {
  constructor() {
    super(new DrugtreatmentRepository());
  }
}
