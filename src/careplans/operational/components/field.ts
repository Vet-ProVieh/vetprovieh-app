import { BaseRepository, ElementBinding, IRepository, WebComponent } from '@tomuench/vetprovieh-shared/lib';
import { OperationField } from '..';
import { VetproviehSelect } from '../../../app/main';
import { Drug, DrugsRepository } from '../../../drugs';
import { MeasureProactiveButton } from '../../../measures';
import { InputFactory } from './field/inputFactory';

/**
 * Pager OperationField
 */
@WebComponent({
  template: undefined,
  tag: 'vp-operation-field',
})
export class VpOperationField extends ElementBinding {
  private barnId = '';
  constructor(barnId: string) {
    super();
    this.barnId = barnId;
  }


  protected afterObjectSet() {
    this.dataset.treatmentKeys = this.object.treatmentKeys;
  }


  /**
   * Getting Repository for element
   * @param {string} src
   * @return {BaseRepository | undefined}
   */
  private getChoiceRepository(src: string): BaseRepository<any> | undefined {
    switch (src) {
      case 'drugs':
        return new DrugsRepository();

      default:
        return undefined;
    }
  }

  /**
   * Callback to Overwrite
   * @protected
   */
  protected _afterRender() {
    if (this.object.choiceSrc) {
      const vetproviehSelect = this.querySelector('vetprovieh-select') as VetproviehSelect;
      if (vetproviehSelect) {
        const repository = this.getChoiceRepository(this.object.choiceSrc);
        if (repository) vetproviehSelect.repository = repository;
      }
    }

    if (this.isDiagnosis(this.object)) {
      let element = this.querySelector("[property='value']") as HTMLTextAreaElement;

      element.addEventListener("change", (event) => {
        let diagnosisButton = this.querySelector("measure-proactive-button") as MeasureProactiveButton;
        diagnosisButton.diagnosis = element.value;
      });
      setTimeout(() => {
        let diagnosisButton = this.querySelector("measure-proactive-button") as MeasureProactiveButton;
        diagnosisButton.diagnosis = element.value;
      }, 400);
    }

    if(this.object.treatmentKeys == "MedikamentName"){
      this.bindDrugField();
    }
  }

  private bindDrugField() {
    let zulassungsField = this.parentElement?.querySelector("vp-operation-field[data-treatment-keys='Zulassungsnummer']") as VpOperationField;
    let vetproviehSelect = zulassungsField?.querySelector("vetprovieh-select") as VetproviehSelect;
    if (vetproviehSelect) {
      let nameFieldArea = this.querySelector("textarea");
      if(nameFieldArea) nameFieldArea.disabled = true;

      vetproviehSelect.addEventListener("change", () => {
        let obj = vetproviehSelect.selectedObject as Drug;
        this.object.value = obj.name;
        if(nameFieldArea) nameFieldArea.value = obj.name;
      })
    }
  }

  /**
   * Is current Object a Diagnosis?
   * @param {OperationField} object 
   * @returns {boolean}
   */
  private isDiagnosis(object: OperationField): boolean {
    return object.treatmentKeys === "Diagnose";
  }

  /**
   * Render Proactive-Button for Template
   * @param {OperationField} object
   * @returns {string} 
   */
  private measureProactiveButton(object: OperationField): string {
    if (this.isDiagnosis(object)) {
      return `<div class="field is-horizontal">
                <div class="field-label">
                </div>
                <div class="field-body">
                  <measure-proactive-button> </measure-proactive-button>
                </div>  
              </div>`;
    } else {
      return "";
    }
  }

  /**
   * Returning template
   * @return {string}
   */
  get template(): string {
    if (this.object) {
      this.object.barnId = this.barnId;
      return super.template + `
            <div class="field is-horizontal" style="margin-top:5px; margin-bottom:5px">
                <div class="field-label">
                    <label class="label">{{name}}</label>
                </div>
                <div class="field-body">
                    <div class="field">
                      ${InputFactory.generateField(this.object.fieldType, this.object)}
                    </div>
                </div>
            </div>
            ${this.measureProactiveButton(this.object)}
            <hr/>`;
    } else {
      return '';
    }
  }
}
