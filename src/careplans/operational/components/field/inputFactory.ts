

export class InputFactory {


    /**
     * Return Extension vor voice-input
     * @param {boolean} voiceInputable
     * @return {string}
     */
    private static isVoiceInputable(voiceInputable: boolean): string {
        if (voiceInputable) {
            return `is="voice-input" `;
        } else {
            return "";
        }
    }

    /**
     * Is Field required?
     * @return {string} "required" | ""
     */
    private static isRequired(required: boolean): string {
        if (required) {
            return this.genTag("required", "");
        } else {
            return "";
        }
    }

    /**
     * Generating a TextArea
     * @param options 
     */
    private static buildTextArea(options: any): string {

        return `<textarea property="value" ` +
            this.genTag("name", options.name) +
            this.genTag("cols", options.cols) +
            this.genTag("rows", options.rows) +
            this.isRequired(options.optional == false) +
            this.isVoiceInputable(options.voiceInputable) + 
            `class="input" type="text"></textarea>`;
    }

    /**
     * Generating specific tag
     * @param {string} tag 
     * @param {string} value 
     */
    private static genTag(tag: string, value: string): string {
        if (tag && value === "") {
            return `${tag} `;
        } else if (value && tag) {
            return `${tag}="${value}" `;
        } else {
            return "";
        }
    }

    /**
     * Generating a InputField
     * @param {string} fieldType 
     * @param {any} options 
     */
    static generateField(fieldType: string, options: any): string {
        let response = "";
        switch (fieldType) {
            /*
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
                            console.log(this.object);
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
                            break;*/
            case 'textArea':
                response += InputFactory.buildTextArea(options);
                break;
            /*
                        case 'video': 
                            templateToBuild +=`<vetprovieh-video name="${this.object.name}"></vetprovieh-video`;
                            break;
                        case 'textFields':
                            break;
                            */
            default:
                response = "<p>Unknown Input</p>";
                break;
        }
        return response;
    }
}