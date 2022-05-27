import {
  VetproviehNavParams,
  WebComponent,
} from '@vetprovieh/vetprovieh-shared';
import {BasicIndexPage} from '../../../shared';
import {Drugtreatment} from '../../models';
import {DrugtreatmentRepository} from '../../repository';

// eslint-disable-next-line new-cap
@WebComponent({
  template: '',
  tag: 'vetprovieh-drugtreatments',
})
/**
 * Drug treatments Index Page
 */
export class DrugstreatmentsIndexPage extends BasicIndexPage<Drugtreatment> {
  private barnId: string;

  /**
   * Default-Constructor
   */
  constructor() {
    const rep = new DrugtreatmentRepository();
    const barnId = VetproviehNavParams.getUrlParameter('barnId');
    rep.barnId = barnId;
    super(rep);
    this.barnId = barnId;
  }
}
