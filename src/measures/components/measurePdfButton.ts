import { WebComponent } from '@tomuench/vetprovieh-shared/lib';
import { PdfButton } from '../../shared';
import { MeasuresRepository } from "../repository";


@WebComponent({
    template: PdfButton.template,
    tag: "measure-pdf-button"
})
export class MeasurePdfButton extends PdfButton {

    constructor(){
        super(new MeasuresRepository());
    }

}