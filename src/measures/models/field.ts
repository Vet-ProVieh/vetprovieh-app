import {BasicModel} from '../../shared';

export class MeasureField extends BasicModel {
    public name = '';
    public value: any;
    public position = 0;
    public choices: string[] = [];
    public detailsType: string | undefined;
    public optional = false;
    public voiceInputable = true;
    public link_position: { id: number, value: any, compare: string } | undefined;
}
