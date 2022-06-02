import {WebComponent} from '@vetprovieh/vetprovieh-shared';
import {CareplansRepository} from '../../../repository/carePlans_repository';
import {Careplan} from '../../../models';
import {BasicIndexPage} from '../../../../../shared';
import * as bulmaToast from 'bulma-toast';
import {Animal} from '../../../../../barns';

// eslint-disable-next-line new-cap
@WebComponent({
  template: '',
  tag: 'vetprovieh-careplans',
})
/**
 * Index of Careplans
 */
export class CarePlanIndexPage extends BasicIndexPage<Careplan> {
    private animals = Animal.all();

    /**
     * Default-Constructor
     */
    constructor() {
      super(new CareplansRepository());
    }

    /**
     * Connected-Callback
     */
    connectedCallback() {
      super.connectedCallback();
      this.attachListenerToDuplicateButtons();
    }

    /**
     * Event for Duplicate Button
     * @param {HTMLButtonElement} button
     */
    private async addDuplicateEventToButton(button: HTMLButtonElement) {
      const func = async (event: any) => {
        const rep = this.repository as CareplansRepository;
        const result = await rep.duplicate(event.path[0].dataset.id);
        if (result) {
          bulmaToast.toast({
            message: 'Behandplungsplan erfolgreich dupliziert',
            type: 'is-success',
            dismissible: false,
            position: 'bottom-center',
            animate: {in: 'fadeIn', out: 'fadeOut'},
          });
          const list = this.getVetproviehList();
          list.search('');
        } else {
          bulmaToast.toast({
            message: 'Behandplungsplan konnte nicht dupliziert werden',
            type: 'is-danger',
            dismissible: false,
            position: 'bottom-center',
            animate: {in: 'fadeIn', out: 'fadeOut'},
          });
        }
      };
      func.bind(this);

      button.addEventListener('click', func);
    }


    /**
     * Attaching Event to Buttons
     */
    private attachListenerToDuplicateButtons() {
      const list = this.getVetproviehList();
      const loadedFunc = () => {
        list.shadowRoot?.querySelectorAll('button').forEach((button) => {
          this.addDuplicateEventToButton(button);
        });
        list.shadowRoot?.querySelectorAll('p.animal').forEach((p) => {
          this.replaceAnimalCode(p as HTMLParagraphElement);
        });
      };
      loadedFunc.bind(this);

      list.addEventListener('loaded', loadedFunc);
    }

    /**
     * Replace Animal Code
     * @param {HTMLParagraphElement} paragraph
     */
    private replaceAnimalCode(paragraph: HTMLParagraphElement) {
      const animal = this.animals
          .filter((a) => a.code===paragraph.innerHTML)[0];
      if (animal) {
        paragraph.innerHTML = animal.name;
      }
    }
}
