import { WebComponent, VetproviehTable } from "@tomuench/vetprovieh-shared/lib";
import { Careplan } from "../../../models";
import { VetproviehDetail } from "../../../../../app/main";
import { LoadedEvent } from "@tomuench/vetprovieh-detail/lib/loaded-event";
import { BasicShowPage } from "../../../../../shared";

@WebComponent({
    template: "",
    tag: "careplan-page"
})
export class CarePlanShowPage extends BasicShowPage {

    private _detailContainer : VetproviehDetail;

    constructor(){
        super();
        this._detailContainer = this.getElementsByTagName("vetprovieh-detail")[0] as VetproviehDetail;
        this._detailContainer.addEventListener("loadeddata", (event: any) => {
            this._setTemplateForGroups();
            this._showGroups((event as LoadedEvent).data as Careplan);
        })
    }

    connectedCallback(){
    }


    private _setTemplateForGroups() {
        let template: HTMLTemplateElement = document.createElement("template");
        template.innerHTML = `
                            <tr class="item">
                                <td class="dragable">
                                    {{item.position}}
                                </td>
                                <td>
                                    <a href="groups/show.html?id={{item.id}}" >
                                        {{item.name}}
                                    </a>
                                </td>
                            </tr>`;
        let groupRepeater = this.getGroupRepeater();
        groupRepeater.listTemplate = template.content;
    }

    private getGroupRepeater() : VetproviehTable {
        return this.detailElement.getByIdFromShadowRoot("groups") as VetproviehTable;
    }

    /**
     * Showing Groups of a Careplan
     * @private
     */
    private _showGroups(careplan: Careplan) {
        if(careplan){
            let groupRepeater = this.getGroupRepeater();
            groupRepeater.objects = careplan.groups;
            groupRepeater.clearAndRender();
        }
    }
}