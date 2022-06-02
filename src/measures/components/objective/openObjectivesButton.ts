import {
  VetproviehElement,
  ViewHelper,
  WebComponent} from '@vetprovieh/vetprovieh-shared';
import {BarnsRepository} from '../../../barns/repository';

// eslint-disable-next-line new-cap
@WebComponent({
  template: `
        <bulma-fab-button href="\${this.href}" icon="fa-info" size="small">
        </bulma-fab-button>
    `,
  tag: 'open-objectives',
})
/**
 * Open Objectives Button
 */
export class OpenObjectivesButton extends VetproviehElement {
  private _amount = 0;
  private _barnId = 0;
  private _autoLoad = false;


  /**
   * Getter barnid
   * @return {number}
   */
  public get barnid(): number {
    return this._barnId;
  }

  /**
   * Setter barnid
   * @param {number} v
   */
  public set barnid(v: number) {
    if (this._barnId !== v) {
      this._barnId = v;
      this.render();
      this.tryToLoadData();
    }
  }

  /**
   * Getter autoload
   * @return {string}
   */
  public get autoload(): string {
    return `${this._autoLoad}`;
  }

  /**
   * Setter autoload
   * @param {string} v
   */
  public set autoload(v: string) {
    this._autoLoad = v === 'true';
  }

  /**
   * Amount of open Objectives
   * @property {number} amount
   */
  public get amount(): number {
    return this._amount;
  }

  /**
   * Setter amount
   * @param {number} v
   */
  public set amount(v: number) {
    if (this.amount !==+v) {
      this._amount = +v;
      this.setVisibility();
    }
  }

  /**
   * Connected Callback
   */
  connectedCallback() {
    super.connectedCallback();
    this.tryToLoadData();
  }

  /**
   * Try to load data from repository
   */
  private tryToLoadData() {
    if (this.autoload) {
      const rep = new BarnsRepository();
      rep.find(this.barnid).then((barn) => {
        this.amount = barn.currentMeasure;
        this.setVisibility();
      }).catch((ex) => console.log(ex));
    } else {
      this.setVisibility();
    }
  }

  /**
   * Rendering Visibility for fab button
   */
  public setVisibility() {
    ViewHelper.toggleVisibility(this, +this.amount > 0);
  }

  /**
   * Link to OpenMeasures
   * @return {string}
   */
  public get href(): string {
    return `/measures/open.html?barnId=${this.barnid}`;
  }


  /**
   * Observed Attributes
   * @return {Array<string>}
   */
  static get observedAttributes() {
    return ['amount', 'barnid', 'autoload'];
  }
}
