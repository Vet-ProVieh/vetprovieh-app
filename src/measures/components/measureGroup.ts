import { ElementBinding, ElementGroupBinding, ObjectHelper, VetproviehElement, VetproviehNavParams, WebComponent } from "@tomuench/vetprovieh-shared/lib";
import { PlanMeasureModel } from "../../careplans/operational/models/planMeasure";
import { SelectButton } from "../../shared";
import { InitializeMeasurePage } from "../pages";
import { MeasureFieldComponent } from "./measureField";
import { TakeoverFactory } from "../factories";
import { MeasureField } from "../models";

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

    private set internalIsValid(v: boolean) {
        if (this._isValid !== v) {
            this._isValid = v;
            if (v) {
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
    protected newElement(): MeasureFieldComponent {
        return new MeasureFieldComponent();
    }

    /**
     * Rendering of select button für Gründe Überschreiten der Kennzahl 2
     */
    renderSelectButton() {
        if (this.object.name == "Gründe für das Überschreiten der Kennzahl 2") {
            let params = VetproviehNavParams.get(InitializeMeasurePage.NAVIGATION_KEY);

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
    private processSelectButtonAnswer(selectButton: SelectButton) {
        let answer = selectButton.recievedParam;
        let fields = this.loadSubFields();

        if (answer) {
            selectButton.scrollIntoView();
            answer.forEach((part: PlanMeasureModel) => {
                if (part.values) {
                    Object.keys(part.values).forEach((paramKey: string) => {
                        let field = (fields as any)[paramKey];
                        if (field) {
                            let value = (part.values as any)[paramKey];
                            if (value) field.attachValue(`${ObjectHelper.formatDate(part.updatedAt)} ${part.name} ${part.id}:\r\n${value}\r\n`);
                        }
                    })
                }
            })
        }
    }

    /**
     * Find fields to fill
     * Key ist expected returnValue key from opPlan
     * @returns 
     */
    private loadSubFields(): any {
        return {
            Behandlung: this.loadSubField("Angaben zu Krankheitsgeschehen"),
            //Diagnose: this.loadSubField("Angaben zu Krankheitsgeschehen"),
            Erregernachweis: this.loadSubField("Erregernachweis / Resistenztest"),
            Sektion: this.loadSubField("Sektion"),
            Sonstiges: this.loadSubField("Sonstiges")
        }
    }

    /**
     * Subfield laden zum füllen
     * @param {string} name 
     * @returns {MeasureFieldComponent}
     */
    private loadSubField(name: string) {
        return this._subfieldBindings.filter((x) => x.object.name == name)[0];
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
        this._subfieldBindings = [];
        let fields = this.subFields();
        fields.forEach((field: MeasureField) => {
            const newField: MeasureFieldComponent = this.newElement();
            newField.object = field;
            if (field.link_position) {
                const prevField = this._subfieldBindings.filter((v) => {
                    return v.object?.position === field.link_position?.id
                })[0];
                if (prevField) {
                    newField.linkToField(prevField);
                }
            }
            super.attachField(newField);
        });
        //super._afterRender();

        this.renderSelectButton();
        let selectButton = this.querySelector("select-button") as SelectButton;
        if (selectButton) {
            this.processSelectButtonAnswer(selectButton);
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
                this.internalIsValid = this.calculateValidation()
            });
        });

        this.internalIsValid = this.calculateValidation();

    }
}