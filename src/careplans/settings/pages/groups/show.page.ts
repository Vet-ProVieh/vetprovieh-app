import { WebComponent, VetproviehTable, VetproviehNavParams } from "@tomuench/vetprovieh-shared/lib";
import { BasicShowPage } from "../../../../shared";
import { CareplanGroup } from "../../models/careplanGroup";
import { CareplanFieldRepository } from "../../repository";

@WebComponent({
    template: "",
    tag: "careplan-group-page"
})
export class CarePlanGroupShowPage extends BasicShowPage {

    connectedCallback() {

        this.detailElement.addEventListener("loadeddata", (event: any) => {
            this._setTemplateForFields();
            this._showGroups(this.detailElement.currentObject as CareplanGroup);

            this.addFieldButton.disabled = !(this.detailElement.currentObject.id)

            let careplanId = VetproviehNavParams.get("careplanId");
            if (careplanId) {
                this.detailElement.currentObject.careplan_id = careplanId;
            }    
        });
    }

    private _setTemplateForFields() {
        let template: HTMLTemplateElement = document.createElement("template");
        template.innerHTML = `
                                <tr class="item">
                                    <td class="dragable small-td">
                                        {{item.position}}
                                    </td>
                                    <td>
                                        <a href="../fields/show.html?id={{item.id}}">
                                            {{item.name}}
                                        </a>
                                    </td>
                                    <td class="small-td">
                                        <button data-action="delete" type="button" class="button is-danger is-small">Löschen</button>
                                    </td>
                                </tr>`;
        let groupRepeater = this.getGroupRepeater();
        groupRepeater.listTemplate = template.content;
        groupRepeater.repository = new CareplanFieldRepository();
    }


    private getGroupRepeater(): VetproviehTable {
        return this.detailElement.getByIdFromShadowRoot("fields") as VetproviehTable;
    }

    /**
     * Showing Groups of a Careplan
     * @param {CareplanGroup} careplan
     * @private
     */
    private _showGroups(careplan: CareplanGroup) {
        if (careplan) {
            let groupRepeater = this.getGroupRepeater();
            groupRepeater.objects = careplan.fields;
            groupRepeater.clearAndRender();
        }
    }

    private get addFieldButton(): HTMLButtonElement {
        return this.detailElement.getByIdFromShadowRoot("addFieldButton") as HTMLButtonElement;
    }
}