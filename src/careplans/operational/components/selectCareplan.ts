import { WebComponent, VetproviehElement, VetproviehNavParams } from "@tomuench/vetprovieh-shared/lib";
import { VetproviehBasicList } from "@tomuench/vetprovieh-list/lib/vetprovieh-basic-list";
import { OperationPlanBluerprintsRepository } from "../repository";
import { Careplan } from "../../settings";


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

        this.repository = new OperationPlanBluerprintsRepository();
    }

    private get selectedAnimalType() : string {
        return VetproviehNavParams.getUrlParameter("animal");
    }

    private get selectedBarnId() : string {
        return VetproviehNavParams.getUrlParameter("barn_id");
    }
    

     /**
     * Attach Data to List
     * @param {Array} data
     * @param {string} searchValue
     * @param {boolean} clear
     */
    attachData(data :any[], searchValue: string, clear = false) {
        super.attachData(this._filterCareplans(data), searchValue, clear);
    }

    /**
     * Filter Careplans after animal-type
     * @param {Array} data
     * @return {Array}
     */
    private _filterCareplans(data: any[]) {
        console.log(this.selectedAnimalType);
        console.log(this.selectedBarnId);
        
        return data.filter((e: Careplan) => {
            // TODO AnimalType muss im Backend gesetzt werden können
            e.animal = this.selectedAnimalType;
            return e.animal === this.selectedAnimalType;
        });
    }

}