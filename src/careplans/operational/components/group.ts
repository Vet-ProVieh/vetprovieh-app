import { VpOperationField } from "./field";
import { ElementGroupBinding, WebComponent } from "@tomuench/vetprovieh-shared/lib";
import { ElementBinding } from "@tomuench/vetprovieh-shared/lib";

/**
 * Pager OperationGroup
 */
@WebComponent({
    template: `<div id="group" class="panel">
                    <p class="panel-heading">
                        {{name}}
                    </p>
                    <div id="fields" class="panel-block" style="display:block">
                    
                    </div>
                </div>`,
    tag: 'vp-operation-group'
})
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
}