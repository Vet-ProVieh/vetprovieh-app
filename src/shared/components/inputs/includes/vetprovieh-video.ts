import {WebComponent} from '@vetprovieh/vetprovieh-shared';
import {VetproviehMedia} from './vetprovieh-media';

// eslint-disable-next-line new-cap
@WebComponent({
  tag: 'vetprovieh-video',
  template: VetproviehMedia.template,
})
/**
 * Vetprovieh-Video Component
 */
export class VetproviehVideo extends VetproviehMedia {
  /**
   * Default-Constructor
   */
  constructor() {
    super();
    this.type = 'video';
  }

  /**
     * Rendering Content
     * @return {string}
     */
  protected get content(): string {
    if (this.thumbnail) {
      return `<video controls> 
                <source src="${this.thumbnail}" 
                        type="video/webm;codecs=vp8,opus">
                </source>
              </video>`;
    } else {
      return super.content;
    }
  }

  /**
     * Generate Button name
     * @return {string}
     */
  protected get buttonname(): string {
    return 'Video';
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
