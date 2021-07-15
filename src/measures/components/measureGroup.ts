import { MeasureFieldComponent } from "./measureField";
import { ElementGroupBinding, WebComponent } from "@tomuench/vetprovieh-shared/lib";
import { ElementBinding } from "@tomuench/vetprovieh-shared/lib";

/**
 * Pager OperationGroup
 */
@WebComponent({
    template: `<div id="group" class="panel is-primary">
                    <p class="panel-heading">
                       {{position}}. {{name}}

                        <button id="openButton" class="button is-primary is-hidden-tablet" type="button"
                        style="right: 0.8em;position: absolute;top: 1.2em;">
                        <i class="fas fa-bars"></i>
                        </button>
                    </p>
                    <div id="fields" class="panel-block" style="display:block">
                    
                    </div>
                </div>`,
    tag: 'vp-measure-group'
})
export class MeasureGroupComponent extends ElementGroupBinding {


    /**
   * Returns the subFields of the object
   * must be overwritten in the children
   * @protected
   */
    protected subFields(): Array<any> {
        return this.object.details;
    }


    /**
     * Generating new SubElement
     * @param type 
     */
    protected newElement(): ElementBinding {
        return new MeasureFieldComponent();
    }
}