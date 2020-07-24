import { ElementBinding } from "@tomuench/vetprovieh-shared/lib";

/**
 * Pager OperationField
 */
export class VpOperationField extends ElementBinding {

    get inputable(): string {
        if(this.object.voiceInputable){
            return 'is="voice-input"'
        } else {
            return "";
        }
    }

    get isRequired(): string {
        if(this.object.optional){
            return "";
        } else {
            return "required";
        }
    }


    /**
     * Returning template
     * @return {string}
     */
    get template(): string {
        return  super.template + `
                <label class="label">{{name}}</label>
                <div class="control">
                    <textarea property="value" class="input" type="text" `+ this.inputable +` ` + this.isRequired +`></textarea>
                </div>
        `;
    }
}

customElements.define('vp-operation-field', VpOperationField);