import { VpOperationField } from "./field";
import { ElementGroupBinding } from "@tomuench/vetprovieh-shared/lib";
import { ElementBinding } from "@tomuench/vetprovieh-shared/lib";

/**
 * Pager OperationGroup
 */
export class VpOperationGroup extends ElementGroupBinding {

    /**
   * Returns the subFields of the object
   * must be overwritten in the children
   * @protected
   */
    protected subFields(): Array<any> {
        return this.object.opFields;
    }


    /**
     * Generating new SubElement
     * @param type 
     */
    protected newElement(): ElementBinding {
        return new VpOperationField();
    }

    /**
     * Returning template
     * @return {string}
     */
    get template(): string {
        return super.template + `
            <div id="group" class="panel">
                <p class="panel-heading">
                    {{name}}
                </p>
                <div id="fields" class="panel-block" style="display:block">
                   
                </div>
            </div>`;
    }
}

customElements.define('vp-operation-group', VpOperationGroup);