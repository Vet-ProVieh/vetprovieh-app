import { VetproviehNavParams, WebComponent } from "@tomuench/vetprovieh-shared/lib";
import { BasicShowPage } from "../../../../../shared";
import { BarnListShow } from "../../../../../barns";

@WebComponent({
    template: "",
    tag:"select-careplans-page"
})
export class SelectCareplanPage extends HTMLElement {

    
    constructor(){
        super();
    }

    connectedCallback() {
        this.barnShower.attributeChangedCallback("barnid","", VetproviehNavParams.getUrlParameter("barn_id"));
    }


    /**
     * Get BarnShower
     * @return {BarnListShow}
     */
    private get barnShower() : BarnListShow{
        return document.getElementById("barnShower") as BarnListShow;
    }
}