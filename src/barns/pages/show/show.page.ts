import { BasicShowPage } from "../../../shared";
import { FarmersRepository } from "../../../farmers";
import { VetproviehSelect, VetproviehDetail } from "../../../app/main";
import { WebComponent } from "@tomuench/vetprovieh-shared/lib";


/**
 * ShowPage
 */
@WebComponent({
    template: "",
    tag:'vetprovieh-barn'
})
export class BarnsShowPage extends BasicShowPage {


    constructor() {
        super();
    }

    connectedCallback() {
        console.log("Barn-Page");
        this.bindFarmerSelectField();
    }

    /**
     * Binding 
     */
    private bindFarmerSelectField(){
        this.detailElement.onloadeddata = (loadEvent:any) => {
            let selectField: VetproviehSelect = this.detailElement.getByIdFromShadowRoot("farmer") as VetproviehSelect;
            if(selectField){
                selectField.repository = new FarmersRepository();
            }
        };
    }
}