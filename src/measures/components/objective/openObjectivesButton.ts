import { VetproviehElement, ViewHelper, WebComponent } from '@tomuench/vetprovieh-shared/lib';
import { BarnsRepository } from '../../../barns/repository';

@WebComponent({
  template: `
        <bulma-fab-button href="\${this.href}" icon="fa-info" size="small"></bulma-fab-button>
    `,
  tag: 'open-objectives',
})
export class OpenObjectivesButton extends VetproviehElement {
  private _amount = 0;
  private _barnId = 0;
  private _autoLoad = false;


  public get barnid(): number {
    return this._barnId;
  }
  public set barnid(v: number) {
    if (this._barnId !== v) {
      this._barnId = v;
      this.render();
      this.tryToLoadData();
    }
  }


  public get autoload(): string {
    return `${this._autoLoad}`;
  }
  public set autoload(v: string) {
    this._autoLoad = v === "true";
  }


  /**
   * Amount of open Objectives
   * @property {number} amount
   */
  public get amount(): number {
    return this._amount;
  }

  public set amount(v: number) {
    if (this.amount != +v) {
      this._amount = +v;
      this.setVisibility();
    }
  }

  connectedCallback() {
    super.connectedCallback();

    this.tryToLoadData();
  }

  private tryToLoadData() {
    if (this.autoload) {
      let rep = new BarnsRepository();
      rep.find(this.barnid).then((barn) => {
        this.amount = barn.currentMeasure;
        this.setVisibility();
      }).catch((ex) => console.log(ex))
    } else {
      this.setVisibility();
    }
  }

  /**
   * Rendering Visibility for fab button
   * @return {string}
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
