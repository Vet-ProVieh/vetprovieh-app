import {
  VetproviehElement,
  ViewHelper,
  WebComponent,
} from '@vetprovieh/vetprovieh-shared';
import {MeasuresRepository} from '../repository';

// eslint-disable-next-line new-cap
@WebComponent({
  template: VetproviehElement.template + `
        <button id="button"
          class="button is-info is-outlined is-fullwidth"
          aria-label="Maßnahmen anzeigen">
            <i class="fas fa-search" aria-hidden="true"></i>
            <span style="padding-left:5px">
              proaktive Maßnahmen anzeigen
            </span>
        </button>
    `,
  tag: 'measure-proactive-button',
})
/**
 * Measure Proactive Button
 */
export class MeasureProactiveButton extends VetproviehElement {
  private _diagnosis = '';
  private repository: MeasuresRepository = new MeasuresRepository();


  /**
   * Connected Callback
   */
  connectedCallback() {
    super.connectedCallback();
    this.button.addEventListener('click', () => {
      const link = `/measures/proactive.html?search=${btoa(this.diagnosis)}`;
      window.open(link, '_self');
    });
    ViewHelper.toggleVisibility(this, false);
  }

  /**
   * skip Render on callback
   * @return {boolean}
   */
  protected get skipRenderOnCallback(): boolean {
    return true;
  }

  /**
   * Getter Diagnosis
   * @return {string}
   */
  public get diagnosis(): string {
    return this._diagnosis;
  }

  /**
   * Setter diagnosis
   * @param {string} v
   */
  public set diagnosis(v: string) {
    if (this._diagnosis !== v) {
      this._diagnosis = v;
      this.checkProactiveMeasures();
    }
  }

  /**
   * Are some proactiveMeasuresFound?
   * @param {boolean} found
   */
  private proactiveMeasuresFound(found: boolean) {
    ViewHelper.toggleVisibility(this, found);
  }

  /**
   * Button
   * @return {HTMLButtonElement}
   */
  private get button(): HTMLButtonElement {
    return this.getByIdFromShadowRoot('button') as HTMLButtonElement;
  }

  /**
   * Check if proactive Measures vor Diagnosis are found
   */
  private checkProactiveMeasures() {
    if (this._diagnosis != '' && this._diagnosis) {
      this.repository.proActive(this._diagnosis).then((result: any[]) => {
        this.proactiveMeasuresFound(result.length > 0);
      }).catch((ex) => console.log(ex));
    }
  }

  /**
   * Observed Attributes
   * @return {string[]}
   */
  static get observedAttributes(): string[] {
    return ['diagnosis'];
  }
}
