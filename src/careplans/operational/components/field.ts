import { ElementBinding, WebComponent } from "@tomuench/vetprovieh-shared/lib";

/**
 * Pager OperationField
 */
@WebComponent({
    template: undefined,
    tag: 'vp-operation-field'
})
export class VpOperationField extends ElementBinding {


    get inputable(): string {
        if (this.object.voiceInputable) {
            return 'is="voice-input"'
        } else {
            return "";
        }
    }

    get isRequired(): string {
        if (this.object.optional) {
            return "";
        } else {
            return "required";
        }
    }

    get renderInput(): string {
        let templateToBuild = `<div class="control">`;

        switch (this.object.fieldType) {

            case 'multipleChoiceFields':
            case 'choiceFields':
                this.object.choices.forEach((choice: string) => {
                    let type = this.object.fieldType == 'multipleChoiceFields' ? 'checkbox' : 'radio';

                    templateToBuild += `<label class="radio">
                            <input type="`+ type + `" name="` + this.object.name + `" ` + this.isRequired + `>
                            ` + choice + `
                            </label>`;
                });
                break;
            case 'comboBox':
                templateToBuild = `<div class="select">
                                        <select name="` + this.object.name + `" ` + this.isRequired + `>`;

                this.object.choices.forEach((choice: string) => {
                    templateToBuild += `<option value="` + choice + `">` + choice + `</option>`;
                });
                templateToBuild += `</select>`;
                break;

            case 'list':
                templateToBuild = `<div class="select is-multiple" >
                                        <select size="8" style="height: 10em" name="` + this.object.name + `" ` + this.isRequired + `>`;

                this.object.choices.forEach((choice: string) => {
                    templateToBuild += `<option value="` + choice + `">` + choice + `</option>`;
                });
                templateToBuild += `</select>`;
                break;
            case 'textArea':
                templateToBuild += `<textarea property="value" name="` + this.object.name + `" class="input" type="text" ` + this.inputable + ` ` + this.isRequired + `></textarea>`;
                break;

            case 'video': 
                templateToBuild +=`<vetprovieh-video name="${this.object.name}"></vetprovieh-video`;
                break;
            case 'textFields':
                break;
            default:
                templateToBuild += `<textarea property="value" name="` + this.object.name + `" class="input" type="text" ` + this.inputable + ` ` + this.isRequired + `></textarea>`;
                break;
        }


        templateToBuild += `</div>`;
        return templateToBuild;
    }


    /**
     * Returning template
     * @return {string}
     */
    get template(): string {
        if (this.object) {
            return super.template + `
                <label class="label">{{name}}</label>` +
                this.renderInput;

        } else {
            return '';
        }
    }
}