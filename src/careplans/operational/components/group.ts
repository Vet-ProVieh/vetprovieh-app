import {VpOperationField} from './field';
import {
  ElementGroupBinding,
  WebComponent,
  ElementBinding,
} from '@vetprovieh/vetprovieh-shared';

// eslint-disable-next-line new-cap
@WebComponent({
  template: `<div id="group" class="panel is-primary">
                    <p class="panel-heading">
                       {{position}}. {{name}}

                        <button id="openButton"
                        class="button is-primary is-hidden-tablet" type="button"
                        style="right: 0.8em;position: absolute;top: 1.2em;">
                        <i class="fas fa-bars" aria-hidden="true"></i>
                        </button>
                    </p>
                    <div id="fields" class="panel-block" style="display:block">

                    </div>
                </div>`,
  tag: 'vp-operation-group',
})
/**
 * Pager OperationGroup
 */
export class VpOperationGroup extends ElementGroupBinding {
    private barnId = '';

    /**
     * Default-Constructor
     * @param {string} barnId
     */
    constructor(barnId: string) {
      super();
      this.barnId = barnId;
    }

    /**
   * Returns the subFields of the object
   * must be overwritten in the children
   * @protected
   * @return {any[]}
   */
    protected subFields(): any[] {
      const objs = (this.object.opFields as Array<any>);
      return objs.sort((a, b) => a.positon - b.position);
    }


    /**
     * Generating new SubElement
     * @return {ElementBinding}
     */
    protected newElement(): ElementBinding {
      return new VpOperationField(this.barnId);
    }
}
