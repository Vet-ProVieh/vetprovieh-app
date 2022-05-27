import {VetproviehElement, WebComponent, ViewHelper}
  from '@vetprovieh/vetprovieh-shared';
import {RecordingModal} from './recording-modal';

// eslint-disable-next-line new-cap
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
            <video id="media" muted="true" width="600" height="400">
            </video>
            ${RecordingModal.fileChooserTemplate('image/*')}
        </section>
        <footer class="modal-card-foot">
            <div class="field is-grouped">
                <p class="control">
                    <button class="button is-primary" id="takeSnapshotButton">
                      Bild aufnehmen
                    </button>
                    <button class="button is-primary" id="loadFileButton">
                      Bild wählen
                    </button>
                </p>
            </div>
        </footer>
        </div>
    </div>`,
})
/**
 * RecordingImageModal
 * -------------------
 * Record a image with RTC and save it
 */
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

    this.bindFileChooser();
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
   * Load Snapshot Button
   * @return {HTMLButtonElement}
   */
  private get snapshotButton(): HTMLButtonElement {
    return this
        .getByIdFromShadowRoot('takeSnapshotButton') as HTMLButtonElement;
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
      } else {
        reject(new Error('No Canvas initiated'));
      }
    });
  }
}
