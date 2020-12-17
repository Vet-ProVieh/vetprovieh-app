import { VetproviehNavParams, WebComponent } from "@tomuench/vetprovieh-shared/lib";
import { BarnsRepository } from "../../repository";
import { Barn } from "../../models";
import { BasicIndexPage } from "../../../shared";


@WebComponent({
    template: "",
    tag: "vetprovieh-barns"
})
export class BarnsIndexPage extends BasicIndexPage<Barn> {
    constructor() {
        super(new BarnsRepository());
    }

    connectedCallback() {
        super.connectedCallback();

        let farmerId = VetproviehNavParams.getUrlParameter("farmerId");
        if (farmerId) {
            this.searchByParams({ "farmer.id": farmerId });
        }
    }

}