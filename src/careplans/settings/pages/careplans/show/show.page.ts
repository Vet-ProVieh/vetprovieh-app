import { WebComponent, VetproviehTable } from "@tomuench/vetprovieh-shared/lib";
import { Careplan } from "../../../models";
import { VetproviehDetail } from "../../../../../app/main";
import { LoadedEvent } from "@tomuench/vetprovieh-detail/lib/loaded-event";
import { CareplanGroupRepository } from "../../../repository";
import { PageWithReadOnly } from "../../../components";

@WebComponent({
    template: "",
    tag: "careplan-page"
})
export class CarePlanShowPage extends PageWithReadOnly {

    private _detailContainer: VetproviehDetail;

    constructor() {
        super();
        this._detailContainer = this.getElementsByTagName("vetprovieh-detail")[0] as VetproviehDetail;
        this._detailContainer.addEventListener("loadeddata", (event: any) => {
            this._setTemplateForGroups();
            this._showGroups((event as LoadedEvent).data as Careplan);
            this.addButton.disabled = !(this.detailElement.currentObject.id);
            this.markAsReadOnly();
        })
    }

    connectedCallback() {
    }

    /**
     * CurrentView Readonly?
     * @return {boolean}
     */
    protected get readOnly(): boolean{
        return this.detailElement.currentObject.readOnly;
    }


    /**
     * Template für die Gruppen setzen
     */
    private _setTemplateForGroups() {

        this.setTemplateForTable(`
        <tr data-index="{{item.index}}" class="item {{item.active}}">
            <td class="dragable small-td">
                {{item.position}}
            </td>
            <td>
                <a href="groups/show.html?id={{item.id}}${this.readOnlyLinkAttached}" >
                    {{item.name}}
                </a>
                <input type="checkbox" disabled/>
            </td>
            <td class="small-td">
                <button data-action="delete" type="button" 
                        class="button is-danger is-small ${this.readOnly ? 'is-hidden' : ''}">
                        Löschen
                </button>
            </td>
        </tr>`, new CareplanGroupRepository());
    }

    /**
     * Showing Groups of a Careplan
     * @private
     */
    private _showGroups(careplan: Careplan) {
        if (careplan) {
            let groupRepeater = this.getTable();

            groupRepeater.afterClearAndRender = function () {
                for (let i = 0; i < this.objects.length; i++) {
                    const group = this.objects[i];
                    if (group.active) {
                        let element = groupRepeater.getElementByIndex(i)
                        console.log(element);
                        let input = element?.querySelector("input")
                        if (input) {
                            input.checked = true;
                        }
                    }
                }
            }
            groupRepeater.afterClearAndRender.bind(groupRepeater)
            groupRepeater.objects = careplan.groups;
        }
    }
}