import { MeasureFieldComponent } from "./measureField";
import { ElementGroupBinding, VetproviehElement, VetproviehNavParams, WebComponent } from "@tomuench/vetprovieh-shared/lib";
import { ElementBinding } from "@tomuench/vetprovieh-shared/lib";
import { OperationPlanSelectPage } from "../../careplans";
import { SelectButton } from "../../shared";

/**
 * Pager OperationGroup
 */
@WebComponent({
    template: VetproviehElement.template +
        `<div id="group" class="panel is-primary" style="margin-bottom: 20px">
                        
                    <p class="panel-heading" style="cursor:pointer">
                       {{position}}. {{name}}

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
            let params = VetproviehNavParams.get("MeasureIntializeParams");
            
            let button = ` <select-button href="/careplans/operational/select.html?barnId=${params.barnId}" name="Übernahme aus Betreuungsmanagement">
                 </select-button>
                 <hr/>`;

            let selectFieldWrapper = this.querySelector('#selectField') as HTMLElement
            if (selectFieldWrapper) selectFieldWrapper.innerHTML = button;

        }
    }

    private processSelectButtonAnswer(answer: any[]) {
        let sektion: MeasureFieldComponent = this._subfieldBindings.filter((x) => x.object.name == "Sektion")[0];
        console.log(sektion);
        if (answer) {
            answer.forEach((part: any) => {
                sektion.attachValue(`${part.id}: ${part.name}`);
            })
        }
    }

    /**
     * Getting Panel Heading
     * @return {HTMLElement}
     */
    private get panelHeading(): HTMLElement {
        return this.querySelector(".panel-heading") as HTMLElement;
    }

    /**
    * Getting Panel Block
    * @return {HTMLElement}
    */
    private get panelBlock(): HTMLElement {
        return this.querySelector(".panel-block") as HTMLElement;
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

        let panelHeading = this.panelHeading;
        if (panelHeading) {
            panelHeading.addEventListener("click", () => {
                this.hideElement(this.panelBlock);
            });
        }
    }
}