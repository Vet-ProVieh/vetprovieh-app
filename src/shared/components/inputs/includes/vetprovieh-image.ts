import { WebComponent } from "@tomuench/vetprovieh-shared/lib";
import { VetproviehMedia } from "./vetprovieh-media";

@WebComponent({
    tag: "vetprovieh-image",
    template: VetproviehMedia.template
})
export class VetproviehImage extends VetproviehMedia {

    constructor(){
        super();
        this.type = "image";
    }

    protected afterModalClose(event:any) {
        this.thumbnail = event.detail.content;
    }

    /**
     * Rendering Content
     * @return {string}
     */
    protected get content(): string {
        if (this.thumbnail) {
            return `<img width="200px" src="${this.thumbnail}" alt="Vorschaubild">`;
        } else {
            return super.content;
        }
    }

    /**
     * Generate Button name
     * @return {string}
     */
    protected get buttonname(): string {
        return "Bild";
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
        return `${super.generateFilename()}.png`;
    }

}