import {VetproviehNavParams, WebComponent} from '@tomuench/vetprovieh-shared/lib';
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
  constructor() {
    super(new OperationPlansRepository());
  }


  connectedCallback() {
    super.connectedCallback();

    const barnId = VetproviehNavParams.getUrlParameter('barn_id');
    if (barnId) {
      this.searchByParams({'barn.id': barnId});
    }
  }
}
