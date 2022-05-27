import {
  VetproviehNavParams,
  WebComponent,
} from '@vetprovieh/vetprovieh-shared';
import {BasicIndexPage} from '../../../../shared';
import {OperationPlan} from '../../models';
import {OperationPlansRepository} from '../../repository/plans_repository';

// eslint-disable-next-line new-cap
@WebComponent({
  template: '',
  tag: 'vetprovieh-operation-plans',
})
/**
 * OperationPlan IndexPage
 */
export class OpertionPlanIndexPage extends BasicIndexPage<OperationPlan> {
  /**
   * Default-Constructor
   */
  constructor() {
    super(new OperationPlansRepository());
  }


  /**
   * Connected-Callback
   */
  connectedCallback() {
    super.connectedCallback();

    const barnId = VetproviehNavParams.getUrlParameter('barn_id');
    if (barnId) {
      this.searchByParams({'barn.id': barnId});
    }
  }
}
