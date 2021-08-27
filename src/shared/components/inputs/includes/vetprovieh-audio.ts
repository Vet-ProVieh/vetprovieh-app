import {WebComponent} from '@tomuench/vetprovieh-shared/lib';
import {VetproviehMedia} from './vetprovieh-media';

@WebComponent({
  tag: 'vetprovieh-audio',
  template: VetproviehMedia.template,
})
export class VetproviehAudio extends VetproviehMedia {
  constructor() {
    super();
    this.type = 'audio';
  }

  /**
     * Rendering Content
     * @return {string}
     */
  protected get content(): string {
    if (this.thumbnail) {
      return `<audio controls> <source src="${this.thumbnail}" type="audio/webm"></source> </audio>`;
    } else {
      return super.content;
    }
  }

  /**
     * Generate Button name
     * @return {string}
     */
  protected get buttonname(): string {
    return 'Audio';
  }

  /**
     * Observed Attributes
     */
  static get observedAttributes() {
    return ['type', 'name', 'value', 'barnid'];
  }


  /**
     * Generating a filename
     * @return {string}
     */
  protected generateFilename() : string {
    return `${super.generateFilename()}.webm`;
  }
}
