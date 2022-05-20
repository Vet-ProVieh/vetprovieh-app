
import {VetproviehElement, VetproviehNavParams}
  from '@tomuench/vetprovieh-shared/lib';
import {Global} from '../../components/basics';

/**
 * Basic-Select-Page
 * Child musst insert the following:
 * - takeoverButton - Button with id="takeoverButton" to
 *                     navigateBack with params
 * - abortbutton - Button with id="abortButton" to navigateBack without params
 */
export class BasicSelectPage extends VetproviehElement {
    public static PARAM_KEY = 'selectPage.return';

    /**
     * Default-Constructor
     */
    constructor() {
      super(false, false);
    }

    /**
     * ConnectedCallback
     */
    connectedCallback() {
      this.render();
      this.registerEventListener();
    }


    /**
     * Return Value
     */
    protected get returnValue(): any {
      throw new Error('Must be implemented in child');
    }

    /**
     * Register different Event-Listener
     */
    private registerEventListener() {
        this.abortButton?.addEventListener('click', () => {
          this.navigateBack();
        });

        this.takeoverButton?.addEventListener('click', () => {
          if (this.hasSelectedItems()) {
            this.setReturnValue();
            this.navigateBack();
          }
        });
    }

    /**
     * Getting ParamKey; Can be overriden in subclasses
     * @return {string}
     */
    protected get paramKey() : string {
      return BasicSelectPage.PARAM_KEY;
    }

    /**
     * Navigate Back and set params
     */
    protected navigateBack() {
      window.location.href = this.returnUrl;
    }

    /**
   * ReturnUrl to Navigate
   * @return {string}
   */
    private get returnUrl(): string {
      return VetproviehNavParams.getUrlParameter('returnUrl');
    }

    /**
     * Checks if items where selcted
     * @return {boolean}
     */
    protected hasSelectedItems(): boolean {
      return Array.isArray(this.returnValue) && this.returnValue.length > 0 ||
        !Array.isArray(this.returnValue) && this.returnValue != undefined;
    }


    /**
     * Setting ReturnValue
     */
    private setReturnValue() {
      let current: Array<any> = VetproviehNavParams.get(this.paramKey);
      if (!Array.isArray(current) || Global.isEmpty(current)) current = [];
      current.push(this.returnValue);
      VetproviehNavParams.set(this.paramKey, current);
    }


    /**
     * Load Takeover-Button from DOM
     * @return {HTMLButtonElement}
     */
    protected get takeoverButton(): HTMLButtonElement {
      return document.getElementById('takeoverButton') as HTMLButtonElement;
    }

    /**
     * Load Abort-Button from DOM
     * @return {HTMLButtonElement}
     */
    private get abortButton(): HTMLButtonElement {
      return document.getElementById('abortButton') as HTMLButtonElement;
    }
}
