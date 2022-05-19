import {BasicModel} from '../../shared';

/**
 * Measure-Field
 */
export class MeasureField extends BasicModel {
    public name = '';
    public value: any;
    public position = 0;
    public choices: string[] = [];
    public detailsType: string | undefined;
    public optional = false;
    public voiceInputable = true;
    // eslint-disable-next-line camelcase
    public link_position: ILinkPosition | undefined;
}

/**
 * Interface ILinkPosition
 */
export interface ILinkPosition {
    id: number;
    value: any;
    compare: string;
}
