import { BasicShowPage } from "../../../shared";
import { FarmersRepository } from "../../../farmers";
import { VetproviehSelect, VetproviehDetail } from "../../../app/main";
import { WebComponent } from "@tomuench/vetprovieh-shared/lib";
import { LoadedEvent } from "@tomuench/vetprovieh-detail/lib/loaded-event";
import { Barn } from "../../models";


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

    private _disableFarmerSelect(loadEvent: LoadedEvent, selectField: VetproviehSelect ){
        let event = loadEvent as LoadedEvent;
        if((event.data as Barn).vvvoNumber){
            selectField.disable();
        }
    }

    /**
     * Binding 
     */
    private bindFarmerSelectField(){
        this.detailElement.addEventListener("loadeddata", (loadEvent:any) => {
           
            let selectField: VetproviehSelect = this.detailElement.getByIdFromShadowRoot("farmer") as VetproviehSelect;
            if(selectField){
                this._disableFarmerSelect(loadEvent as LoadedEvent, selectField);
                selectField.repository = new FarmersRepository();
            }
        });
    }
}