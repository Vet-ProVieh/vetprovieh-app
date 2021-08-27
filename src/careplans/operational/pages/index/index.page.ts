import {VetproviehNavParams, WebComponent} from '@tomuench/vetprovieh-shared/lib';
import {OperationPlan} from '../../models';
import {OperationPlansRepository} from '../../repository/plans_repository';
import {BasicIndexPage} from '../../../../shared';

@WebComponent({
  template: '',
  tag: 'vetprovieh-operation-plans',
})
export class OpertionPlanIndexPage extends BasicIndexPage<OperationPlan> {
  constructor() {
    super(new OperationPlansRepository());
  }


  connectedCallback() {
    super.connectedCallback();

    const barnId = VetproviehNavParams.getUrlParameter('barn_id');
    if (barnId) {
      this.searchByParams({'barnId': barnId});
    }
  }
}
