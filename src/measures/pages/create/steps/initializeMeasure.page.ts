import {
  ObjectHelper,
  VetproviehNavParams,
  WebComponent} from '@vetprovieh/vetprovieh-shared';
import {BarnListShow} from '../../../../barns';

// eslint-disable-next-line new-cap
@WebComponent({
  template: '',
  tag: 'initialize-measure',
})
/**
 * Initialize a new Measure page
 */
export class InitializeMeasurePage extends HTMLElement {
    public static NAVIGATION_KEY = 'MeasureIntializeParams';

    /**
 * Connected-Callback
 */
    connectedCallback() {
      this.barnShower.barnid = VetproviehNavParams.getUrlParameter('barn_id');

      this.datePicker.value = ObjectHelper.dateToString(new Date());

      this.initializeButton.addEventListener('click', () => {
        const date = this.datePicker.value;
        const freq = this.therapyFrequencySlider.value;
        this.resetNewPage();
        VetproviehNavParams.set(InitializeMeasurePage.NAVIGATION_KEY, {
          barnId: VetproviehNavParams.getUrlParameter('barn_id'),
          therapyFrequency: freq,
          measuresDate: date,
        });
      });

      this.therapyFrequencySlider.addEventListener('input', () => {
        this.therapyFrequencyText.value = this.therapyFrequencySlider.value;
        console.log('slider input');
      });

      this.therapyFrequencyText.addEventListener('keyup', () => {
        this.therapyFrequencySlider.value = this.therapyFrequencyText.value;
        console.log(this.therapyFrequencySlider.value);
        console.log('textinput');
      });
    }

    /**
     * Reset new Page
     */
    private resetNewPage() {
      let key = `${window.location.protocol}//${window.location.hostname}`;
      key += '/measures/new.html?barn_id=null';
      VetproviehNavParams.delete(key);
    }

    /**
 * Getter initialize Button
 * @return {HTMLButtonElement}
 */
    private get initializeButton(): HTMLButtonElement {
      return document.getElementById('btn-new') as HTMLButtonElement;
    }

    /**
     * Load DatePicker from DOM
     * @return {HTMLInputElement}
     */
    private get datePicker(): HTMLInputElement {
      return document.getElementById('measures-date') as HTMLInputElement;
    }

    /**
     * Load Therapy-Frequency from DOM
     * @return {HTMLInputElement}
     */
    private get therapyFrequencySlider(): HTMLInputElement {
      return document.getElementById('therapy-frequency') as HTMLInputElement;
    }

    /**
     * Get TherapyFrequency
     * @return {HTMLInputElement}
     */
    private get therapyFrequencyText(): HTMLInputElement {
      return document
          .getElementById('therapy-frequency-text') as HTMLInputElement;
    }

    /**
     * Get BarnShower
     * @return {BarnListShow}
     */
    private get barnShower() : BarnListShow {
      return document.getElementById('barnShower') as BarnListShow;
    }
}
