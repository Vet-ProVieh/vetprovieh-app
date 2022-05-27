import {VetproviehElement, WebComponent} from '@vetprovieh/vetprovieh-shared';
import RecordRTC from 'recordrtc';
import {RecordingModal} from './recording-modal';
import {RecordingRtcModal} from './recording-rtc-modal';

// eslint-disable-next-line new-cap
@WebComponent({
  tag: 'recording-audio-modal',
  template: VetproviehElement.template + `
    <div id="modal" class="modal">
        <div class="modal-background"></div>
        <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">Aufnahme für \${this.title}</p>
            <button id="closeButton" class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
            <audio muted="true" style="object-fit: fill;" id="media">
            ${RecordingModal.fileChooserTemplate('aduio/*')}
            </audio>
        </section>
        <footer class="modal-card-foot">
            ${RecordingRtcModal.buttonsTemplate}
          </div>
        </footer>
        </div>
    </div>`,
})
/**
 * Recording Audio Modal
 */
export class RecordingAudioModal extends RecordingRtcModal {
  /**
     * After Stream started, bind recorder
     * @param {MediaStream} stream
     */
  protected afterStreamStarted(stream: MediaStream) {
    this.recorder = new RecordRTC(stream, {
      type: 'audio',
      mimeType: 'audio/webm',
    });
  }
}
