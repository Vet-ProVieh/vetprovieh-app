

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
     * Mehrfachauswahl möglich
     * @param {boolean} multiple 
     * @return {string}
     */
    private static isMultiple(multiple: boolean): string {
        if (multiple) {
            return this.genTag("multiple", "");
        } else {
            return "";
        }
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
     * Wrap FromControl around the input
     * @param {string} input 
     * @return {string}
     */
    private static wrapFormControl(input: string): string {
        return `<div class="control">${input}</div>`;
    }

    /**
     * Generating a InputField
     * @param {string} fieldType 
     * @param {any} options 
     */
    static generateField(fieldType: string, options: any): string {
        let response = "";
        switch (fieldType) {
            case "textFields":
                response = this.buildTextField(options);
                break;
            case "image":
                response = this.buildImage(options);
                break;
            case "speech":
                response = this.buildSpeech(options);
                break;
            case 'comboBox':
                response = this.buildCombo(options);
                break;
            case 'careplanList':
                response = this.buildList(options);
                break;
            case 'video':
                response = this.buildVideo(options);
                break;
            case 'textArea':
                response = this.buildTextArea(options);
                break;
            default:
                response = "<p>Unknown Input</p>";
                break;
        }
        return this.wrapFormControl(response);
    }

    /**
     * Generating a VideoArea
     * @param {any} options 
     */
    private static buildVideo(options: any): string {
        return `<vetprovieh-video ${this.genTag("name", options.name)}></vetprovieh-video>`;
    }

    /**
     * Generating a SpeechArea
     * @param {any} options 
     * @return {string}
     */
    private static buildSpeech(options: any) : string {
        return `<vetprovieh-speech ` +
                `></vetprovieh-speech>`
    }

    /**
     * Generating a VideoArea
     * @param {any} options 
     */
    private static buildImage(options: any): string {
        return `<vetprovieh-video ` +
            this.genTag("type", "image") +
            this.genTag("name", options.name) +
            `></vetprovieh-video>`;
    }

    /**
     * Generating a TextArea
     * @param {any} options 
     */
    private static buildTextArea(options: any): string {
        return `<textarea ` +
            this.genTag("property", "value") +
            this.genTag("name", options.name) +
            this.genTag("cols", options.cols) +
            this.genTag("rows", options.rows) +
            this.isVoiceInputable(options.voiceInputable) +
            `class="input" type="text" ` +
            this.isRequired(options.optional != true) +
            `></textarea>`;
    }

    /**
     * Generating a Combobox
     * @param {any} options 
     * @return {string}
     */
    private static buildCombo(options: any): string {
        return this.buildSelect(options)
    }

    /**
     * Generating a List
     * @param {string} options 
     * @return {string}
     */
    private static buildList(options: any): string {
        options["style"] = "height: 10em";
        options["size"] = 8;

        return this.buildSelect(options)
    }

    /**
     * Building a Text Input
     * @param {any} options
     * @return {string}
     */
    private static buildTextField(options: any): string {
        return `<input ` +
            this.genTag("property", "value") +
            this.isVoiceInputable(options.voiceInputable) +
            `class="input" type="text">`;
    }

    /**
    * Generating a Select-Element
    * @param {string} options 
    * @return {string}
    */
    private static buildSelect(options: any): string {
        return `<div class="select is-multiple">` +
            `<select ` +
            this.genTag("property", "value") +
            this.genTag("size", options.size) +
            this.genTag("style", options.style) +
            this.genTag("name", options.name) +
            this.isMultiple(options.multipleSelect) +
            this.isRequired(options.optional != true) +
            `>${this.buildOptionTags(options.choices)}</select></div>`;
    }

    /**
     * Building Option Tags
     * @param {string[]} choices 
     * @return {string}
     */
    private static buildOptionTags(choices: string[]): string {
        if (choices) {
            return choices.map((choice) => `<option value="` + choice + `">` + choice + `</option>`)
                .join("\r\n");
        } else {
            return "";
        }
    }
}
