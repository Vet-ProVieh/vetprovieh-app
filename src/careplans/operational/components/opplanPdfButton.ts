import { WebComponent } from '@tomuench/vetprovieh-shared/lib';
import { PdfButton } from '../../../shared';
import { OperationPlansRepository } from '../repository';


@WebComponent({
    template: PdfButton.template,
    tag: "opplan-pdf-button"
})
export class MeasurePdfButton extends PdfButton {

    constructor(){
        super(new OperationPlansRepository());
    }

}