import { BaseRepository, ElementBinding, IRepository, WebComponent } from "@tomuench/vetprovieh-shared/lib";
import { VetproviehSelect } from "../../../app/main";
import { DrugsRepository } from "../../../drugs";
import { InputFactory } from "./field/inputFactory";

/**
 * Pager OperationField
 */
@WebComponent({
    template: undefined,
    tag: 'vp-operation-field'
})
export class VpOperationField extends ElementBinding {

    private barnId: string = "";
    constructor(barnId: string){
        super();
        this.barnId = barnId;
    }


    /**
     * Getting Repository for element
     * @param {string} src 
     * @return {BaseRepository | undefined}
     */
    private getChoiceRepository(src: string) : BaseRepository<any> | undefined {
        switch (src) {
            case "drugs":
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
        if(this.object.choiceSrc){
            let vetproviehSelect = this.querySelector("vetprovieh-select") as VetproviehSelect;
            if(vetproviehSelect){
                let repository = this.getChoiceRepository(this.object.choiceSrc);
                if(repository) vetproviehSelect.repository = repository;
            }
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
                    <div class="field">` +
                InputFactory.generateField(this.object.fieldType, this.object) + 
                `   </div>
                </div>
            </div>
            <hr/>`;

        } else {
            return '';
        }
    }
}