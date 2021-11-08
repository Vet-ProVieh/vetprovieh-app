import {VetproviehElement, WebComponent} from '@tomuench/vetprovieh-shared/lib';
import RecordRTC from 'recordrtc';
import {RecordingModal} from './recording-modal';
import {RecordingRtcModal} from './recording-rtc-modal';


@WebComponent({
  tag: 'recording-video-modal',
  template: VetproviehElement.template + `
    <div id="modal" class="modal">
        <div class="modal-background"></div>
        <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">Aufnahme für \${this.title}</p>
            <button id="closeButton" class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
            <video style="object-fit: fill;" muted="true" playsinline="true" id="media">
            </video>
            ${RecordingModal.fileChooserTemplate('video/*')}
        </section>
        <footer class="modal-card-foot">
            ${RecordingRtcModal.buttonsTemplate}
          </div>
        </footer>
        </div>
    </div>`,
})
export class RecordingVideoModal extends RecordingRtcModal {
  /**
     * After Stream started, bind recorder
     * @param {MediaStream} stream
     */
  protected afterStreamStarted(stream: MediaStream) {
    this.recorder = new RecordRTC(stream, {
      type: 'video',
    });
  }
}
