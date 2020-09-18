import { VetproviehDetail } from "../../../app/main";


export class BasicShowPage extends HTMLElement {


    /**
     * Load Detail-Element from DOM
     * @return {VetproviehDetail}
     */
    protected get detailElement(): VetproviehDetail {
        return document.getElementsByTagName("vetprovieh-detail")[0] as VetproviehDetail;
    }
}