import {WebComponent} from '@tomuench/vetprovieh-shared/lib';
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
    private addDuplicateEventToButton(button: HTMLButtonElement) {
      const func = (event: any) => {
        console.log(event);
        const rep = this.repository as CareplansRepository;
        rep.duplicate(event.path[0].dataset.id).then((result) => {
          if (result) {
            bulmaToast.toast({
              message: 'Behandplungsplan erfolgreich dupliziert',
              type: 'is-success',
              dismissible: false,
              position: 'bottom-center',
              animate: {in: 'fadeIn', out: 'fadeOut'},
            });
            const list = this.getVetproviehList();
            list._filterObjects();
          } else {
            bulmaToast.toast({
              message: 'Behandplungsplan konnte nicht dupliziert werden',
              type: 'is-danger',
              dismissible: false,
              position: 'bottom-center',
              animate: {in: 'fadeIn', out: 'fadeOut'},
            });
          }
        });
      };
      func.bind(this);

      button.addEventListener('click', func);
    }


    /**
     * Attaching Event to Buttons
     */
    private attachListenerToDuplicateButtons() {
      const list = this.getVetproviehList();
      const self = this;
      list.addEventListener('loaded', () => {
            list.shadowRoot?.querySelectorAll('button').forEach((button) => {
              self.addDuplicateEventToButton(button);
            });
            list.shadowRoot?.querySelectorAll('p.animal').forEach((p) => {
              self.replaceAnimalCode(p as HTMLParagraphElement);
            });
      });
    }

    /**
     * Replace Animal Code
     * @param {HTMLParagraphElement} paragraph
     */
    private replaceAnimalCode(paragraph: HTMLParagraphElement) {
      const animal = this.animals
          .filter((a) => a.code == paragraph.innerHTML)[0];
      if (animal) {
        paragraph.innerHTML = animal.name;
      }
    }
}
