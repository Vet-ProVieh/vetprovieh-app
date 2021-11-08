import {BasicModel} from '../../../shared';


/**
 * Field in a OperationGroup
 */
export class OperationField extends BasicModel {
    public name = '';
    public value: any;
    public cols : any;
    public fieldType : any;
    public optional : any;
    public position : any;
    public rows : any;
    public treatmentKeys : any;
    public updatedAt : any;
    public voiceInputable : any;
}
