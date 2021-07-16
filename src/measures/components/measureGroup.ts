import { MeasureFieldComponent } from "./measureField";
import { ElementGroupBinding, VetproviehNavParams, WebComponent } from "@tomuench/vetprovieh-shared/lib";
import { ElementBinding } from "@tomuench/vetprovieh-shared/lib";
import { OperationPlanSelectPage } from "../../careplans";
import { SelectButton } from "../../shared";

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
                    <div class="panel-block" style="display:block">
                       <div id="selectField"></div>

                        <div id="fields" >
                        
                        </div>
                    </div>

                </div>`,
    tag: 'vp-measure-group'
})
export class MeasureGroupComponent extends ElementGroupBinding {


    connectedCallback() {
        super.connectedCallback();
    }

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

    renderselectButton() {
        if (this.object.name == "Gründe für das Überschreiten der Kennzahl 2") {
            let button = ` <select-button href="/careplans/operational/select.html" name="Übernahme aus Betreuungsmanagement">
                 </select-button>
                 <hr/>`;

            let selectFieldWrapper = this.querySelector('#selectField') as HTMLElement
            if (selectFieldWrapper) selectFieldWrapper.innerHTML = button;

        }
    }

    private processSelectButtonAnswer(answer: any[]){
        let sektion : MeasureFieldComponent = this._subfieldBindings.filter((x) => x.object.name == "Sektion")[0];
        console.log(sektion);
        answer.forEach((part:any) => {
            sektion.attachValue(`${part.id}: ${part.name}`);
        })
    }


    _afterRender() {
        super._afterRender();
        this.renderselectButton();
        let selectButton = this.querySelector("select-button") as SelectButton;
        if (selectButton) {
            console.log("Antwort vom Select-button")
            this.processSelectButtonAnswer(selectButton.recievedParam);
            selectButton.scrollIntoView();
        }
    }
}