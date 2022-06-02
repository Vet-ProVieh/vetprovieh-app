import {
  ElementGroupBinding,
  VetproviehElement,
  VetproviehNavParams,
  WebComponent,
} from '@vetprovieh/vetprovieh-shared';
import {Barn} from '../../barns';
import {RenderType} from '../../shared';
import {DynamicForm} from '../../shared/components/forms/dynamicForm';
import {ReplaceFactory, TakeoverFactory} from '../factories';
import {Measure, MeasureGroup} from '../models';
import {InitializeMeasurePage} from '../pages';
import {MeasuresRepository} from '../repository';
import {MeasureGroupComponent} from './measureGroup';
import {MeasurePdfButton} from './measurePdfButton';
import {ObjectivesComponent} from './objective';

/**
 * Controller for Page
 * pages/operations/plans/create or edit
 */
// eslint-disable-next-line new-cap
@WebComponent({
  template:
    VetproviehElement.template +
    `
    <form id="form">
        <vetprovieh-notification id="notification">
        </vetprovieh-notification>
        <div class="tabs  is-toggle is-fullwidth is-large">
          <ul>
            <li class="is-active">
              <a data-id="detail" data-state="execution">
                <span class="icon is-small">
                  <i class="fas fa-scroll" aria-hidden="true">
                  </i></span>
                <span class="is-hidden-touch">Planung</span>
              </a>
            </li>
            <li>
              <a data-id="objectives" data-state="execution">
                <span class="icon is-small">
                  <i class="fas fa-toolbox" aria-hidden="true">
                  </i></span>
                <span class="is-hidden-touch">Durchführung</span>
              </a>
            </li>
            <li>
              <a data-id="objectives" data-state="valuation">
                <span class="icon is-small">
                  <i class="fas fa-star" aria-hidden="true">
                  </i></span>
                <span class="is-hidden-touch">Bewertung</span>
              </a>
            </li>
          </ul>
        </div>
        <div id="detail" class="container">


        </div>
        <div id="objectives" class="panel is-hidden is-primary">
          <p class="panel-heading">
          Maßnahmen zur Verringerung des Antibiotika-Einsatzes
          </p>
        </div>

        <div class="container sticky-footer">
            <div class="columns is-mobile">
                <div class="column">
                    <input id="abortButton"
                            class="button is-danger is-fullwidth"
                            type="reset" value="Abbrechen">
                </div>
                <div class="column is-2">
                  <measure-pdf-button></measure-pdf-button>
                </div>
                <div class="column">
                    <input id="saveButton"
                            class="button is-success is-fullwidth"
                            type="button" value="Speichern">
                </div>
            </div>
        </div>
    </form>
    `,
  tag: 'vp-measure',
})
/**
 * Measure Component
 */
export class MeasureComponent extends DynamicForm<Measure, MeasureGroup> {
  private repository: MeasuresRepository = new MeasuresRepository();
  private categories: HTMLAnchorElement[] = [];
  private objectivesComponent: ObjectivesComponent | undefined;

  /**
   * Default-Constructor
   */
  constructor() {
    super('data', RenderType.Multiple);
    this.storeElement = true;
    this.src = '/service/measures';
  }

  /**
  * Run Callback
  */
  connectedCallback() {
    super.connectedCallback();
    this.registerTabEvents();
  }


  /**
   * Building a GroupComponent
   * must be implemented in Subclass
   * @return {ElementGroupBinding}
   */
  protected buildGroupComponent(): ElementGroupBinding {
    return new MeasureGroupComponent();
  }

  /**
   * Overwriteable Callback
   * @param {any} data
   * @protected
   */
  _afterFetch(data: any) {
    let params = VetproviehNavParams.get(InitializeMeasurePage.NAVIGATION_KEY);
    if (!params) params = {};

    if (data?.barn?.id) {
      params.barnId = data.barn.id;
      VetproviehNavParams.set(InitializeMeasurePage.NAVIGATION_KEY, params);
    }

    this.setParamsToComponent(params);

    const pdfButton = this
        .shadowRoot?.querySelector('measure-pdf-button') as MeasurePdfButton;
    pdfButton.objectid = data.id;

    if (this.isNew()) {
      this.takeoverLastMeasure().then(() => {
        super._afterFetch(data);
      }).catch((error) => console.error(error));
    } else {
      super._afterFetch(data);
    }
    this.attachObjectivesComponent();
  }

  /**
   * Adding ObjectivesComponent to DOM
   */
  private attachObjectivesComponent() {
    this.objectivesComponent = new ObjectivesComponent();

    if (!Array.isArray(this.currentObject.objectives)) {
      this.currentObject.objectives = [];
    }
    this.objectivesComponent.objectives = this.currentObject.objectives;

    this.objectivesContainer.append(this.objectivesComponent);
  }

  /**
   * Tab-Buttons registrieren.
   */
  private registerTabEvents() {
    this.shadowRoot?.querySelectorAll('a').forEach((a: HTMLAnchorElement) => {
      if (a) {
        this.categories.push(a);
        a.addEventListener('click', () => {
          this.activateTabAnchor(a);
          this.deactiveTabAnchors(a);
        });

        // Activate the current Process-Step
        const step = VetproviehNavParams.getUrlParameter('process');
        const state = VetproviehNavParams.getUrlParameter('state');
        if (a.dataset.id === step && a.dataset.state===state) {
          a.click();
        }
      }
    });
  }

  /**
   * AfterSave Callback
   */
  protected afterSave() {
    if (!window.location.pathname.includes('show')) {
      const link = `/measures/show.html?id=${this.currentObject.id}` +
      `&process=objectives&state=execution`;
      window.open(link, '_self');
    }
  }

  /**
   * Mark Anchor as activated and remove hidden vor Tab
   * @param {HTMLAnchorElement} a
   */
  private activateTabAnchor(a: HTMLAnchorElement) {
    const showId = a.dataset.id;
    a.parentElement?.classList.add('is-active');
    const element = this.shadowRoot?.querySelector(`#${showId}`);
    if (element) {
      element.classList.remove('is-hidden');
    }

    if (this.objectivesComponent) {
      this.objectivesComponent.state = a.dataset.state as string;
    }
  }

  /**
   * Mark Tab-Anchor as not active and hide other Elements
   * @param {HTMLAnchorElement} a
   */
  private deactiveTabAnchors(a: HTMLAnchorElement) {
    const showId = a.dataset.id;
    this.categories.filter((x) => x !==a).forEach((otherA) => {
      const showCatId = otherA.dataset.id;
      otherA.parentElement?.classList.remove('is-active');

      if (showId !== showCatId) {
        const element = this.shadowRoot?.querySelector(`#${showCatId}`);
        if (element) {
          element.classList.add('is-hidden');
        }
      }
    }, false);
  }

  /**
   * Last Measure Takeover
   * @return {Promise<any>}
   */
  private takeoverLastMeasure(): Promise<any> {
    const takeoverFactory = new TakeoverFactory(
        this.currentObject,
        this.repository);
    return takeoverFactory.takeoverFromLatestMeasure().then(() => {
      return this.loadBasicData();
    }).catch((error) => {
      console.warn(error);
      return this.loadBasicData();
    });
  }

  /**
   * Loading Basic Data for Barn and User
   * @return {Promise<any>}
   */
  private loadBasicData(): Promise<any> {
    const replaceFactory = new ReplaceFactory();
    return replaceFactory
        .replacePlaceholders(this.currentObject)
        .catch((error) => console.log(error));
  }

  /**
   * Get Objectives Container
   * @return {HTMLElement}
   */
  private get objectivesContainer(): HTMLElement {
    return this.shadowRoot?.querySelector('#objectives') as HTMLElement;
  }

  /**
   * on the new page?
   * @return {boolean}
   */
  private isNew(): boolean {
    return window.location.href.includes('new');
  }

  /**
   * Initialising Object with Params
   * @param {any} params
   */
  private setParamsToComponent(params: any) {
    if (params !==null && params !==undefined) {
      if (params.barnId !==null && params.barnId !==undefined) {
        this.currentObject.barn = {id: parseInt(params.barnId)} as Barn;
      }
      if (params.measuresDate !==null && params.measuresDate !==undefined) {
        this.currentObject.measuresDate = params.measuresDate;
      }
      if (params.therapyFrequency !==null &&
        params.therapyFrequency !==undefined) {
        this.currentObject.therapyFrequency = params.therapyFrequency;
      }
    }
  }
}
