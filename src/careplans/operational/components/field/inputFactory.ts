

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
      return '';
    }
  }

  /**
     * Is Field required?
     * @return {string} "required" | ""
     */
  private static isRequired(required: boolean): string {
    if (required) {
      return this.genTag('required', '');
    } else {
      return '';
    }
  }

  /**
     * Mehrfachauswahl möglich
     * @param {boolean} multiple
     * @return {string}
     */
  private static isMultiple(multiple: boolean): string {
    if (multiple) {
      return this.genTag('multiple', '');
    } else {
      return '';
    }
  }

  /**
     * Generating specific tag
     * @param {string} tag
     * @param {string} value
     */
  private static genTag(tag: string, value: string): string {
    if (tag && value === '') {
      return `${tag} `;
    } else if (value && tag) {
      return `${tag}="${value}" `;
    } else {
      return '';
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
    let response = '';
    switch (fieldType) {
      case 'textFields':
        response = this.buildTextField(options);
        break;
      case 'image':
        response = this.buildImage(options);
        break;
      case 'dateFields':
        response = this.buildDatePicker(options);
        break;
      case 'speech':
        response = this.buildSpeech(options);
        break;
      case 'comboBox':
        response = this.buildCombo(options);
        break;
      case 'checkBox':
        response = this.buildCheckbox(options);
        break;
      case 'detailsList':
        response = this.buildList(options);
        break;
      case 'careplanList':
        response = this.buildList(options);
        break;
      case 'pdfFields':
        response = this.buildFileUpload(options);
        break;
      case 'video':
        response = this.buildVideo(options);
        break;
      case 'textArea':
        response = this.buildTextArea(options);
        break;
      default:
        response = '<p>Unknown Input</p>';
        break;
    }
    return this.wrapFormControl(response);
  }


  /**
     * Generating a FileUpload
     * @param {any} options
     */
  private static buildFileUpload(options: any): string {
    return `<file-upload ` +
      this.genTag('barnid', options.barnId) +
      this.genTag('property', 'value') +
      this.genTag('name', options.name) +
      this.isRequired(options.optional != true) +
      `></file-upload>`;
  }

  /**
     * Generating a VideoArea
     * @param {any} options
     */
  private static buildDatePicker(options: any): string {
    return `<input ` +
      this.genTag('property', 'value') +
      this.genTag('name', options.name) +
      `class="input" type="date" ` +
      this.isRequired(options.optional != true) +
      `></input>`;
  }

  /**
     * Generating a VideoArea
     * @param {any} options
     */
  private static buildVideo(options: any): string {
    return `<vetprovieh-video ${this.genTag('barnid', options.barnId)} ${this.genTag('property', 'value')} ${this.genTag('name', options.name)}></vetprovieh-video>`;
  }

  /**
     * Creating Bulma Checkbox
     * @param options
     * @returns
     */
  private static buildCheckbox(options: any): string {
    return `<bulma-multi-checkbox 
                choicesasstring="${options.choices.join(',')}" 
                type="${options.multipleSelect ? 'checkbox' : 'radio'}" 
                ${this.genTag('property', 'value')}>
                </bulma-multi-checkbox>`;
  }

  /**
     * Generating a SpeechArea
     * @param {any} options
     * @return {string}
     */
  private static buildSpeech(options: any): string {
    return `<vetprovieh-audio ` +
      this.genTag('barnid', options.barnId) +
      this.genTag('property', 'value') +
      this.genTag('type', 'audio') +
      this.genTag('name', options.name) +
      `></vetprovieh-audio>`;
  }

  /**
     * Generating a VideoArea
     * @param {any} options
     */
  private static buildImage(options: any): string {
    return `<vetprovieh-image ` +
      this.genTag('barnid', options.barnId) +
      this.genTag('property', 'value') +
      this.genTag('type', 'image') +
      this.genTag('name', options.name) +
      `></vetprovieh-image>`;
  }

  /**
     * Generating a TextArea
     * @param {any} options
     */
  private static buildTextArea(options: any): string {
    return `<textarea ` +
      this.genTag('property', 'value') +
      this.genTag('name', options.name) +
      this.genTag('cols', options.cols) +
      this.genTag('rows', options.rows) +
      this.isVoiceInputable(options.voiceInputable) +
      `class="textarea" type="text" ` +
      this.isRequired(options.optional != true) +
      `></textarea>`;
  }

  /**
     * Generating a Combobox
     * @param {any} options
     * @return {string}
     */
  private static buildCombo(options: any): string {
    if (options.choiceSrc) {
      return this.buildVetproviehSelect(options);
    } else {
      return this.buildSelect(options);
    }
  }

  /**
     * Generating a List
     * @param {string} options
     * @return {string}
     */
  private static buildList(options: any): string {
    options['style'] = 'height: 10em';
    options['size'] = 8;

    return this.buildSelect(options);
  }

  /**
     * Building a Text Input
     * @param {any} options
     * @return {string}
     */
  private static buildTextField(options: any): string {
    return `<textarea ` +
      this.genTag('property', 'value') +
      this.genTag('name', options.name) +
      this.isVoiceInputable(options.voiceInputable) +
      this.isRequired(options.optional != true) +
      `class="input" type="text"></textarea>`;
  }

  /**
    * Generating a Select-Element
    * @param {string} options
    * @return {string}
    */
  private static buildSelect(options: any): string {
    return `<div class="select is-multiple">` +
      `<select ` +
      this.genTag('property', 'value') +
      this.genTag('size', options.size) +
      this.genTag('style', options.style) +
      this.genTag('name', options.name) +
      this.isMultiple(options.multipleSelect) +
      this.isRequired(options.optional != true) +
      `>${this.buildOptionTags(options.choices)}</select></div>`;
  }

  private static buildVetproviehSelect(options: any): string {
    return `<div class="select is-multiple" style="width:100%;">` +
      `<vetprovieh-select display="approvalNumber" internalprop="approvalNumber" ` +
      this.genTag('property', 'value') +
      this.genTag('size', options.size) +
      this.genTag('style', options.style) +
      this.genTag('name', options.name) +
      this.isMultiple(options.multipleSelect) +
      this.isRequired(options.optional != true) +
      `>
            <template>
                <div style="padding:5px">
                    <span>{{name}} ({{approvalNumber}}), {{manufacturer}}</span>
                </div>
            </template>
            </vetprovieh-select></div>`;
  }

  /**
     * Building Option Tags
     * @param {string[]} choices
     * @return {string}
     */
  private static buildOptionTags(choices: string[]): string {
    let blank = `<option value=""></option>`
    if (choices) {
      return blank + choices.map((choice) => `<option value="` + choice + `">` + choice + `</option>`)
        .join('\r\n');
    } else {
      return '';
    }
  }
}
