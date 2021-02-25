import { VetproviehElement, WebComponent } from "@tomuench/vetprovieh-shared/lib";
import RecordRTC from "recordrtc";
import { RecordingRtcModal } from "./recording-rtc-modal";


@WebComponent({
    tag: "recording-audio-modal",
    template: VetproviehElement.template + `
    <div id="modal" class="modal">
        <div class="modal-background"></div>
        <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">Aufnahme für \${this.title}</p>
            <button id="closeButton" class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
            <audio style="object-fit: fill;" id="media">
            </audio>
        </section>
        <footer class="modal-card-foot"> 
            ${RecordingRtcModal.buttonsTemplate}
          </div>
        </footer>
        </div>
    </div>`
})
export class RecordingAudioModal extends RecordingRtcModal {


    /**
     * After Stream started, bind recorder
     * @param {MediaStream} stream 
     */
    protected afterStreamStarted(stream: MediaStream){
        this.recorder = new RecordRTC(stream, {
            type: 'audio',
            mimeType: 'audio/webm',
        });
    }


}