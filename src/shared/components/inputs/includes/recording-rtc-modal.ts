import RecordRTC from 'recordrtc';
import {RecordingModal} from './recording-modal';


export class RecordingRtcModal extends RecordingModal {
    protected recorder: RecordRTC | undefined;
    private _recording = false;

    /**
     * Set Recording
     * @param {boolean} v
     */
    private set recording(v: boolean) {
      if (this._recording != v) {
        if (this.startButton) this.startButton.disabled = v;
        if (this.stopButton) this.stopButton.disabled = !v;
        this._recording = v;
      }
    }

    /**
     * Template for Buttons
     * @return {string}
     */
    public static get buttonsTemplate() : string {
      return `
        <div class="field is-grouped">
        <p class="control">
            <button class="button is-primary" id="start">
                <span class="icon"><i class="fas fa-play"></i></span>
                <span>Aufnahme starten</span>
            </button>
        </p>
        <p class="control">
           <button class="button is-primary" id="loadFileButton">Audio/Video wählen</button>
        </p>
        <p class="control">
            <button class="button is-danger" id="stop" disabled>
                <span class="icon"><i class="fas fa-stop"></i></span>
                <span>Aufnahme stoppen</span>
            </button>
        </p>
        <p class="control">
            <button class="button is-primary is-hidden" id="takeoverButton">
            <span class="icon"><i class="fas fa-download"></i></span>
                <span>Aufnahme übernehmen</span>
            </button>
        </p>`;
    }

    /**
     * Add Listener to Buttons
     */
    protected addButtonListeners() {
      const _self = this;

      this.bindFileChooser();
      
      this.startButton.addEventListener('click', () => {
        this.startRecording(_self);
        this.startButton.classList.add('is-hidden');
        this.fileButton.classList.add('is-hidden');
      });
      this.stopButton.addEventListener('click', () => {
        this.stopRecording(_self);
        this.stopButton.classList.add('is-hidden');
        this.startButton.classList.add('is-hidden');
        this.takeoverButton.classList.remove('is-hidden');
      });

      const closeFuncTakeover = () => {
        this.recordedContent = this._content;
        this.close(true);
      };
      closeFuncTakeover.bind(this);
      this.takeoverButton.addEventListener('click', closeFuncTakeover);
    }

    protected reset() {
      URL.revokeObjectURL(this.mediaElement.src);
      this.mediaElement.src = '';
      this.mediaElement.autoplay = true;
      this.mediaElement.controls = false;
      this._content = null;
      this.recordedContent = null;
      this.stopButton.classList.remove('is-hidden');
      this.startButton.classList.remove('is-hidden');
      this.takeoverButton.classList.add('is-hidden');
    }

    /**
     * After Stream started, bind recorder
     * @param {MediaStream} stream
     */
    protected afterStreamStarted(stream: MediaStream) {
      this.recorder = new RecordRTC(stream, {
        type: 'video',
      });
    }

    /**
     * Starting Recording
     * @param self
     */
    private startRecording(self: RecordingRtcModal) {
        self.recorder?.startRecording();
        self.recording = true;
    }

    /**
     * Stop Video-Recording
     * @param {RecordingModal} self
     */
    private stopRecording(self: RecordingRtcModal) {
      if (self.recorder) {
        self.recorder.stopRecording(() => {
          // @ts-ignore
          self._content = this.recorder.getBlob();
          self.mediaElement.srcObject = null;
          self.mediaElement.src = URL.createObjectURL(self._content);
          self.mediaElement.controls = true;
          self.mediaElement.autoplay = false;
        });
      } else {
        self.mediaElement.srcObject = null;
      }
      self.recording = false;
    }

    /**
     * Gettings StartButton
     * @return {HTMLButtonElement}
     */
    private get startButton(): HTMLButtonElement {
      return this.getByIdFromShadowRoot('start') as HTMLButtonElement;
    }

    /**
    * Gettings StopButton
    * @return {HTMLButtonElement}
    */
    private get stopButton(): HTMLButtonElement {
      return this.getByIdFromShadowRoot('stop') as HTMLButtonElement;
    }

    /**
    * Gettings takeoverButton
    * @return {HTMLButtonElement}
    */
    private get takeoverButton(): HTMLButtonElement {
      return this.getByIdFromShadowRoot('takeoverButton') as HTMLButtonElement;
    }
}
