import {ObjectHelper, VetproviehNavParams, WebComponent} from '@tomuench/vetprovieh-shared/lib';
import {BarnListShow} from '../../../../barns';

@WebComponent({
  template: '',
  tag: 'initialize-measure',
})
export class InitializeMeasurePage extends HTMLElement {
    public static NAVIGATION_KEY = 'MeasureIntializeParams';

    constructor() {
      super();
    }

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

    private resetNewPage() {
      let key = `${window.location.protocol}//${window.location.hostname}`;
      key += '/measures/new.html?barn_id=null';
      VetproviehNavParams.delete(key);
    }


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

    private get therapyFrequencyText(): HTMLInputElement {
      return document.getElementById('therapy-frequency-text') as HTMLInputElement;
    }

    /**
     * Get BarnShower
     * @return {BarnListShow}
     */
    private get barnShower() : BarnListShow {
      return document.getElementById('barnShower') as BarnListShow;
    }
}
