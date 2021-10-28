import {VetproviehNavParams, WebComponent} from '@tomuench/vetprovieh-shared/lib';
import {BasicIndexPage} from '../../../shared';
import { Drugtreatment } from '../../models';
import { DrugtreatmentRepository } from '../../repository';


@WebComponent({
  template: '',
  tag: 'vetprovieh-drugtreatments',
})
export class DrugstreatmentsIndexPage extends BasicIndexPage<Drugtreatment> {
  private barnId: string;

  constructor() {
    const rep = new DrugtreatmentRepository();
    const barnId = VetproviehNavParams.getUrlParameter('barnId');
    rep.barnId = barnId;
    super(rep);
      this.barnId = barnId;
  }
}
