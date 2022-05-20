import {VetproviehElement, WebComponent} from '@tomuench/vetprovieh-shared/lib';
import {Barn} from '../models';
import {BarnsRepository} from '../repository';


// eslint-disable-next-line new-cap
@WebComponent({
  template: `
        <p style="font-size:0.9em">
        <strong>
        Stall:</strong> \${this.barn?.name} ($\{this.barn?.vvvoNumber})<br />
        <strong>
        Landwirt:</strong> \${this.barn?.farmer.name} \${this.barnContact}<br />
        </p>
    `,
  tag: 'barn-list-show',
})
/**
 * Showing Barns as a List
 */
export class BarnListShow extends VetproviehElement {
    private repository: BarnsRepository = new BarnsRepository();

    private _barnid = '';

    private barn: Barn | undefined = undefined;
    /**
     * Default_Constructor
     */
    constructor() {
      super(false, false);
    }

    /**
     * Get BarnContact
     * @return {string}
     */
    public get barnContact() : string {
      const contactPerson = this.barn?.farmer.contactPerson;

      if (contactPerson?.firstName && contactPerson?.lastName) {
        return ` (${contactPerson.firstName} ${contactPerson.lastName})`;
      } else {
        return '';
      }
    }

    /**
     * Getting BarnId
     * @return {string}
     */
    public get barnid(): string {
      return this._barnid;
    }

    /**
     * Set Barnid
     * @param {string} v
     */
    public set barnid(v: string) {
      if (this._barnid !== v) {
        this._barnid = v;
        this.loadBarn();
      }
    }

    /**
     * Getting Observed Attributes (Web-Component)
     */
    static get observedAttributes() {
      return ['barnid'];
    }

    /**
     * Skipping Rendering?
     * @return {boolean}
     */
    protected get skipRenderOnCallback(): boolean {
      return true;
    }

    /**
     * Loading Barn
     */
    private loadBarn() {
      try {
        if (this.barnid && !isNaN(parseInt(this.barnid))) {
          this.repository.find(parseInt(this.barnid)).then((barn) => {
            this.barn = barn;
            this.render();
          }).catch((error) => {
            console.warn('Could not load Barn');
            console.warn(error);
          });
        }
      } catch (ex) {
      }
    }
}
