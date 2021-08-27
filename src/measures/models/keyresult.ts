import {BasicModel} from '../../shared';

export class KeyResult extends BasicModel {
    public active = true;
    public milestones: KeyResultMilestones | string = KeyResultMilestones.Start;
    public name = '';
    public position = 1;
    public value = 0;
}

export enum KeyResultMilestones {
    Current = 'Current',
    Target = 'Target',
    Start = 'Start'
}
