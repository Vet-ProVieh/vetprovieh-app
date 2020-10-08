import { WebComponent, VetproviehElement } from "@tomuench/vetprovieh-shared/lib";
import { VetproviehBasicList } from "@tomuench/vetprovieh-list/lib/vetprovieh-basic-list";
import { CareplansRepository } from "../../settings/repository/carePlans_repository";


@WebComponent({
    template: VetproviehElement.template + `<style>
            :host {
                display: block;
            }
            #listElements div{
                cursor: pointer;
            }
            #listElements div:hover {
                background-color: #F0F0F0 !important;
            }
            </style>

            <!-- SearchControl on Top -->
            <div id="searchControl" class="control">
            <input id="search" class="input" type="text" 
                    placeholder="Bitte Suchbegriff eingeben">
            </div>

            <!-- Listing Elements here -->
            <div id="listElements" style="margin-top:20px;">

            </div>
            <!-- Pager for Paging through List-->
            <vetprovieh-pager id="pager" page="1" maximum="7">
            </vetprovieh-pager>`,
    tag: "select-careplan"
})
export class SelectCareplan  extends VetproviehBasicList {


    constructor() {
        super();

        this.repository = new CareplansRepository();
    }

    /**
     * Filter Careplans after animal-type
     */
    private _filterCareplans() {

    }

}