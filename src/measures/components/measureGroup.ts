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
        `<div id="group" class="panel" style="margin-bottom: 20px">
                        
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

    private _isValid: boolean = false;

    connectedCallback() {
        super.connectedCallback();
    }

    private set isValid(v: boolean) {
        if(this._isValid !== v){
            this._isValid = v;
            if(v) {
                this.querySelector("#group")?.classList.add("is-primary");
                this.hideElement(this.panelBlock);
            } else {
                this.querySelector("#group")?.classList.remove("is-primary");
            }
        }
    }


    /**
     * Is Group Valid
     * @return {boolean}
     */
    public get isValid(): boolean {
        return this._isValid;
    }

    /**
     * Calculate value of subfields
     * @returns {boolean}
     */
    private calculateValidation(): boolean {
        return this._subfieldBindings.map((field) => {
            let measureField = field as MeasureFieldComponent;
            return measureField.isValid
        }).reduce((pv: boolean, cv: boolean) => pv && cv, true)
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

    /**
     * Rendering of select button für Gründe Überschreiten der Kennzahl 2
     */
    renderSelectButton() {
        if (this.object.name == "Gründe für das Überschreiten der Kennzahl 2") {
            let params = VetproviehNavParams.get("MeasureIntializeParams");

            let button = ` <select-button href="/careplans/operational/select.html?barnId=${params.barnId}" name="Übernahme aus Betreuungsmanagement">
                 </select-button>
                 <hr/>`;

            let selectFieldWrapper = this.querySelector('#selectField') as HTMLElement
            if (selectFieldWrapper) selectFieldWrapper.innerHTML = button;

        }
    }

    /**
     * Process answer of select-Button.
     * TODO unterschiedliche Fälle implementieren
     * @param answer 
     */
    private processSelectButtonAnswer(answer: any[]) {
        let sektion: MeasureFieldComponent = this._subfieldBindings.filter((x) => x.object.name == "Sektion")[0];
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
        this.renderSelectButton();
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

        this.initValidation();
    }

    /**
     * Intialising Validation and Bind EventListener to Fields
     * Calculate Validation for first time
     */
    private initValidation() {
        this._subfieldBindings.forEach((subfield) => {
            subfield.addEventListener("change", (subfield: MeasureFieldComponent) => {
                this.isValid = this.calculateValidation()
            });
        });

        this.isValid = this.calculateValidation();

    }
}