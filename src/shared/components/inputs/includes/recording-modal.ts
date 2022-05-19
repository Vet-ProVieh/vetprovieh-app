import {VetproviehElement, ViewHelper} from '@tomuench/vetprovieh-shared/lib';
import {Global} from '../../basics';

/**
 * Recording-Modal
 * ---------------
 * Record Audio or Video.
 */
export class RecordingModal extends VetproviehElement {
  private _active = false;
  private _title = '';
  protected _content: Blob | null = null;

  protected _stream: MediaStream | undefined;

  protected recordedContent: any | undefined;

  protected isMobile = Global.isMobile;

  /**
   * Get Title
   * @return {string}
   */
  public get title(): string {
    return this._title;
  }

  /**
   * Set title
   * @param {string} v
   */
  public set title(v: string) {
    if (this._title !== v) {
      this._title = v;
    }
  }

  /**
   * Getter Active
   * @return {boolean}
   */
  public get active(): boolean {
    return this._active;
  }

  /**
   * Setter Active
   * @param {boolean} v
   */
  public set active(v: boolean) {
    if (this._active !== v) {
      this._active = v;
      if (v) {
        this.modalBox.classList.add('is-active');
        this.startVideo();
      } else {
        this.modalBox.classList.remove('is-active');
      }
    }
  }


  /**
   * Conencted-Callback
   * - Bindings and so on
   */
  connectedCallback() {
    super.connectedCallback();

    const closeFunc = () => {
      this.close();
    };
    closeFunc.bind(this);
    this.closeButton.addEventListener('click', closeFunc);

    this.addButtonListeners();
  }

  /**
   * Adding Listener to Buttons
   */
  protected addButtonListeners() {
    throw new Error('Please implement');
  }

  /**
   * Get Content from Modal
   * @return {Blob|null}
   */
  public loadContent(): Blob | null {
    return this._content;
  }

  /**
   * Closing Modal
   * @param {boolean} takeover
   */
  public close(takeover = false) {
    this.active = false;

    // Dispatching Changed Event
    const event = new CustomEvent('change', {
      detail: {
        takeover: takeover,
        content: takeover ? this.recordedContent : undefined,
      },
    });
    this.closeStreams();
    this.dispatchEvent(event);
    this.reset();
  }

  /**
   * Overwrite in Subclasses
   * Resets Modal
   */
  protected reset() {
    console.log('Recording-Modal reset');
  }

  /**
   * Closing Media-Streams from client
   */
  private closeStreams() {
    this.mediaElement.srcObject = null;

    this._stream?.getTracks().forEach((track) => {
      if (track.readyState == 'live') {
        track.stop();
      }
    });
    this._stream = undefined;
  }

  /**
   * Starting Video
   */
  private startVideo() {
    const streamFunc = (stream: MediaStream) => {
      this.mediaElement.autoplay = true;
      this.mediaElement.srcObject = stream;
      this._stream = stream;

      this.afterStreamStarted(stream);
    };

    streamFunc.bind(this);

    let videoOptions: any = true;

    if (this.isMobile) {
      videoOptions = {
        facingMode: 'environment',
      };
    }
    if (navigator.mediaDevices) {
      (navigator as any).getUserMedia = navigator.mediaDevices.getUserMedia;

      navigator.mediaDevices.getUserMedia({
        video: videoOptions,
        audio: true,
      }).then(streamFunc, this.bindingFailed);
    }
  }

  /**
   * After stream Started
   * @param {MediaStream} stream
   */
  protected afterStreamStarted(stream: MediaStream) {
    console.debug('Recording-Modal: AfterStreamStarted');
    console.debug(stream);
  }

  /**
   * Log binding Error
   * @param {any} error
   */
  private bindingFailed(error: any) {
    console.log(error);
  }


  /**
   * Get MediaElement
   * @return {HTMLVideoElement}
   */
  protected get mediaElement(): HTMLVideoElement {
    return this.getByIdFromShadowRoot('media') as HTMLVideoElement;
  }

  /**
  * Gettings closeButton
  * @return {HTMLButtonElement}
  */
  private get closeButton(): HTMLButtonElement {
    return this.getByIdFromShadowRoot('closeButton') as HTMLButtonElement;
  }

  /**
   * Getting ModalBox
   * @return {HTMLElement}
   */
  private get modalBox(): HTMLElement {
    return this.getByIdFromShadowRoot('modal') as HTMLElement;
  }


  /**
   * File Input laden
   * @return {HTMLButtonElement}
   */
  protected get fileInput(): HTMLInputElement {
    return this.getByIdFromShadowRoot('fileInput') as HTMLInputElement;
  }

  /**
   * File Button laden
   * @return {HTMLButtonElement}
   */
  protected get fileButton(): HTMLButtonElement {
    return this.getByIdFromShadowRoot('loadFileButton') as HTMLButtonElement;
  }

  /**
   * Bind FileChooser
   */
  protected bindFileChooser() {
    this.fileButton.addEventListener('click', () => {
      this.fileInput.addEventListener(
          'change',
          (event: any) => this.loadImage(event)
      );
      this.fileInput.click();
    });
  }


  /**
   * Load File-Shower
   * @return {HTMLImageElement}
   */
  protected get fileShower(): HTMLImageElement {
    return this.getByIdFromShadowRoot('fileShower') as HTMLImageElement;
  }

  /**
   * Loading a image
   * @param {any} event
   */
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
            this._content = b;
            this.close(true);
          })
          .catch((e) => console.error(e));
    });

    reader.readAsDataURL(event.path[0].files[0]);
  }


  /**
   * Observed Attributes
   */
  static get observedAttributes() {
    return ['type', 'title'];
  }

  /**
   * Getting FileChooser Template
   * @param {string} type
   * @return {String} for example image/*
   */
  public static fileChooserTemplate(type: string): String {
    return `<img id="fileShower" class="is-hidden" />
      <input id="fileInput" type="file" class="is-hidden" accept="${type}" />`;
  }
}
