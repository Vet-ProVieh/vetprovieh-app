import {BasicModel} from '../../shared';

/**
 * ActionPlan
 */
export class ActionPlan extends BasicModel {
    public name = '';
    public actionId: number | undefined;
    public desc = '';
}
