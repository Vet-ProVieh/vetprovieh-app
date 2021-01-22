import { WebComponent, VetproviehTable, VetproviehNavParams } from "@tomuench/vetprovieh-shared/lib";
import { BasicShowPage } from "../../../../shared";
import { PageWithReadOnly } from "../../components";
import { CareplanGroup } from "../../models/careplanGroup";
import { CareplanFieldRepository } from "../../repository";

@WebComponent({
    template: "",
    tag: "careplan-group-page"
})
export class CarePlanGroupShowPage extends PageWithReadOnly {

    connectedCallback() {

        this.detailElement.addEventListener("loadeddata", (event: any) => {
            this._setTemplateForFields();
            this._showGroups(this.detailElement.currentObject as CareplanGroup);

            this.addButton.disabled = !(this.detailElement.currentObject.id);
            this.markAsReadOnly();
            
            let careplanId = VetproviehNavParams.get("careplanId");
            if (careplanId) {
                this.detailElement.currentObject.careplan_id = careplanId;
            }
        });
    }

    private _setTemplateForFields() {
        this.setTemplateForTable(`
            <tr class="item">
                <td class="dragable small-td">
                    {{item.position}}
                </td>
                <td>
                    <a href="../fields/show.html?id={{item.id}}${this.readOnlyLinkAttached}">
                        {{item.name}}
                    </a>
                </td>
                <td class="small-td">
                    <button data-action="delete" type="button" 
                            class="button is-danger is-small ${this.readOnly ? 'is-hidden' : ''}">
                            Löschen
                    </button>
                </td>
            </tr>`,
            new CareplanFieldRepository())
    }

    /**
     * Showing Groups of a Careplan
     * @param {CareplanGroup} careplan
     * @private
     */
    private _showGroups(careplan: CareplanGroup) {
        if (careplan) {
            let groupRepeater = this.getTable();
            groupRepeater.objects = careplan.fields;
            groupRepeater.clearAndRender();
        }
    }
}