import { VetproviehElement, WebComponent, ViewHelper } from '@tomuench/vetprovieh-shared/lib';
import { RecordingModal } from './recording-modal';


@WebComponent({
  tag: 'recording-image-modal',
  template: VetproviehElement.template + `
    <div id="modal" class="modal">
        <div class="modal-background"></div>
        <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">Aufnahme für \${this.title}</p>
            <button id="closeButton" class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
            <video id="media" muted="true width="600" height="400">
            </video>
            <img id="fileShower" class="is-hidden" />
            <input id="fileInput" type="file" class="is-hidden" accept="image/*" />
        </section>
        <footer class="modal-card-foot">
            <div class="field is-grouped">
                <p class="control">
                    <button class="button is-primary" id="takeSnapshotButton">Bild aufnehmen</button>
                    <button class="button is-primary" id="loadFileButton">Datei wählen</button>
                </p>
            </div>
        </footer>
        </div>
    </div>`,
})
export class RecordingImageModal extends RecordingModal {
  /**
     * Adding Listener to Buttons
     */
  protected addButtonListeners() {
    const takeSnapshot = () => {
      this.snapshot().then(() => {
        this.close(true);
      });
    };
    takeSnapshot.bind(this);
    this.snapshotButton.addEventListener('click', takeSnapshot);

    this.fileButton.addEventListener("click", (_) => {
      this.fileInput.addEventListener("change", (event: any) => this.loadImage(event))
      this.fileInput.click();
    });
  }

  /**
    * Setter Active
    * @param {boolean} v
    */
  public set active(v: boolean) {
    if (this.active !== v) {
      ViewHelper.toggleVisibility(this.mediaElement, true);
      ViewHelper.toggleVisibility(this.fileShower, false);
      super.active = v;
    }
  }

  /**
   * File Input laden
   * @return {HTMLButtonElement}
   */
   protected get fileInput(): HTMLInputElement {
    return this.getByIdFromShadowRoot("fileInput") as HTMLInputElement;
  }

  /**
   * File Button laden
   * @return {HTMLButtonElement}
   */
  protected get fileButton(): HTMLButtonElement {
    return this.getByIdFromShadowRoot("loadFileButton") as HTMLButtonElement;
  }

  /**
   * Load Snapshot Button
   * @return {HTMLButtonElement}
   */
  private get snapshotButton(): HTMLButtonElement {
    return this.getByIdFromShadowRoot("takeSnapshotButton") as HTMLButtonElement;
  }

  /**
   * Load File-Shower
   * @return {HTMLImageElement}
   */
  private get fileShower(): HTMLImageElement {
    return this.getByIdFromShadowRoot("fileShower") as HTMLImageElement;
  }

  private loadImage(event: any) {

    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.recordedContent = event.target.result;
      this.fileShower.src = this.recordedContent;
      ViewHelper.toggleVisibility(this.fileShower, false);
      ViewHelper.toggleVisibility(this.fileShower, true);
      fetch(this.recordedContent)
        .then((result) => result.blob())
        .then((b) => {
          this._content = b
          this.close(true);
        })
        .catch((e) => console.error(e));
    })

    reader.readAsDataURL(event.path[0].files[0]);

  }

  /**
     * Taking a Snapshot from Canvas
     * @return {Promise<any>}
     */
  private snapshot(): Promise<any> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      canvas.width = 1280;
      canvas.height = 720;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(this.mediaElement, 0, 0, canvas.width, canvas.height);
        this.recordedContent = canvas.toDataURL('image/png');
        canvas.toBlob((blob: Blob | null) => {
          this._content = blob;
          resolve(true);
        });
      }
    });
  }
}
