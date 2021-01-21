import { WebComponent, VetproviehTable } from "@tomuench/vetprovieh-shared/lib";
import { BasicShowPage } from "../../../../shared";
import { CareplanGroup } from "../../models/careplanGroup";

@WebComponent({
    template: "",
    tag: "careplan-group-page"
})
export class CarePlanGroupShowPage extends BasicShowPage {

    connectedCallback() {
        this.detailElement.addEventListener("loadeddata", (event: any) => {
            this._setTemplateForFields();
            this._showGroups(this.detailElement.currentObject as CareplanGroup);
        });
    }

    private _setTemplateForFields() {
        let template: HTMLTemplateElement = document.createElement("template");
        template.innerHTML = `
                                <tr class="item">
                                    <td class="dragable">
                                        {{item.position}}
                                    </td>
                                    <td>
                                        <a href="../fields/show.html?id={{item.id}}">
                                            {{item.name}}
                                        </a>
                                    </td>
                                    <td>
                                        <button data-action="delete" type="button">Löschen</button>
                                    </td>
                                </tr>`;
        let groupRepeater = this.getGroupRepeater();
        groupRepeater.listTemplate = template.content;
    }


    private getGroupRepeater() : VetproviehTable {
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
}