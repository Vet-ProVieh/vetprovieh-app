import { VetproviehRepeat, ViewHelper } from "@tomuench/vetprovieh-shared";
import { VetproviehElement } from "@tomuench/vetprovieh-shared";
import { OperationGroup } from "../../models/operations/group";

/**
 * Pager OperationGroup
 */
export class VpOperationGroup extends VetproviehElement {

    private _group: OperationGroup = new OperationGroup();
    //private _fieldsRepeater: VetproviehRepeat;

    /**
     * Getter group 
     * @property
     * @return {OperationGroup}
     */
    public get group(): OperationGroup {
        return this._group;
    }

    /**
     * Setter group 
     * @param {OperationGroup} value
     */
    public set group(value: OperationGroup) {
        if (this._group != value) {
            this._group = value;
        }
    }

    /**
     * Connected Callback
     */
    public connectedCallback() {
        if (!this.shadowRoot) {
            super.attachShadow({
                mode: 'open',
            }).innerHTML = ''

            this._renderTemplate();
        }
    }

    _renderTemplate() {
        if (this.shadowRoot) {
            let div = document.createElement("div");
            div.innerHTML = VpOperationGroup.template;
            ViewHelper.replacePlaceholders(div, this.group);
            this.shadowRoot.innerHTML = '';
            this.shadowRoot.append(div);
        }
    }

    // -----------------
    // CLASS METHODS
    // -----------------

    /**
     * Returning template
     * @return {string}
     */
    static get template(): string {
        return super.template + `
            <div id="group" class="panel">
                <p class="panel-heading">
                    {{name}}
                </p>
                <div id="fields class="panel-block" style="display:block">
                    Hier kommen die Felder rein.
                </div>
            </div>`;
    }

    /**
       * Observed attributes
       * @return {Array<string>}
       */
    static get observedAttributes() {
        return ['group'];
    }
}

customElements.define('vp-operation-group', VpOperationGroup);