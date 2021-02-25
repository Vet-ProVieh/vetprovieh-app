import { VetproviehElement, WebComponent } from "@tomuench/vetprovieh-shared/lib";
import { RecordingModal } from './recording-modal';


@WebComponent({
    tag: "recording-image-modal",
    template: VetproviehElement.template + `
    <div id="modal" class="modal">
        <div class="modal-background"></div>
        <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">Aufnahme für \${this.title}</p>
            <button id="closeButton" class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
            <video id="media" width="600" height="400">
            </video>
        </section>
        <footer class="modal-card-foot"> 
            <div class="field is-grouped">
                <p class="control">
                    <button class="button is-primary" id="takeSnapshotButton">Aufnehmen</button>
                </p>
            </div>
        </footer>
        </div>
    </div>`
})
export class RecordingImageModal extends RecordingModal {

    /**
     * Adding Listener to Buttons
     */
    protected addButtonListeners() {
        let b = this.getByIdFromShadowRoot("takeSnapshotButton") as HTMLButtonElement;
        let takeSnapshot = () => {
            this.snapshot().then(() => {

                this.close(true);
            })
        }
        takeSnapshot.bind(this);
        b.addEventListener("click", takeSnapshot)
    }

    /**
     * Taking a Snapshot from Canvas
     * @return {Promise<any>}
     */
    private snapshot(): Promise<any> {
        return new Promise((resolve, reject) => {
            var canvas = document.createElement('canvas');
            canvas.width = 1280;
            canvas.height = 720;
            var ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(this.mediaElement, 0, 0, canvas.width, canvas.height);
                this.recordedContent = canvas.toDataURL('image/png');
                canvas.toBlob((blob: Blob | null) => {
                    this._content = blob;
                    resolve();
                })
            }
        })
    }
}