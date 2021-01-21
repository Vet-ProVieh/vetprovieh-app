import { VetproviehElement, WebComponent } from "@tomuench/vetprovieh-shared/lib";
import RecordRTC from "recordrtc";


@WebComponent({
    tag: "vetprovieh-video",
    template: VetproviehElement.template + `<video id="video" width="300" height="200">

               </video>
               <button id="start">Start</button><button id="stop">Stop</button>`
})
export class VetproviehVideo extends VetproviehElement {

    private recorder : RecordRTC | undefined;
    private _recording: boolean = false;

    private set recording(v: boolean) {
        if(this._recording != v) {
            console.log(v);
            this.startButton.disabled = v;
            this.stopButton.disabled = !v;
            this._recording = v;
        }
    }

    connectedCallback() {
        super.connectedCallback();

        var _self = this;
        this.startButton.addEventListener("click", () => {
            this.startVideo(_self)
        });
        this.stopButton.addEventListener("click", () => {
            this.stopVideo(_self);
        })
    }

    /**
     * Bind Video from Device
     */
    public startVideo(self: VetproviehVideo) {
        navigator.getUserMedia({ video: true, audio: true }, (stream) => {
            self.mediaElement.autoplay = true;
            self.mediaElement.srcObject = stream;

            self.recorder = new RecordRTC(stream, {
                type: 'video',
            });
            self.recorder.startRecording();
            self.recording = true;
            
        }, (error) => this.bindingFailed(error));
    }

    /**
     * Stop Video-Recording
     */
    public stopVideo(self: VetproviehVideo) {
        self.recorder?.stopRecording();
        self.mediaElement.srcObject = null;
        self.recording = false;
    }

    private bindingFailed(e: any) {
        console.log(e);
    }

    /**
     * Gettings StartButton
     * @return {HTMLButtonElement}
     */
    private get startButton(): HTMLButtonElement {
        return this.getByIdFromShadowRoot("start") as HTMLButtonElement;
    }

    private get mediaElement(): HTMLVideoElement {
        return this.getByIdFromShadowRoot('video') as HTMLVideoElement;
    }

     /**
     * Gettings StopButton
     * @return {HTMLButtonElement}
     */
    private get stopButton(): HTMLButtonElement {
        return this.getByIdFromShadowRoot("stop") as HTMLButtonElement;
    }
}