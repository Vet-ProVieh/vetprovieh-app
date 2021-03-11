import { WebComponent } from "@tomuench/vetprovieh-shared/lib";
import { CareplansRepository } from "../../../repository/carePlans_repository";
import { Careplan } from "../../../models";
import { BasicIndexPage } from "../../../../../shared";
import * as bulmaToast from 'bulma-toast';
import { Animal } from "../../../../../barns";

@WebComponent({
    template: "",
    tag:"vetprovieh-careplans"
})
export class CarePlanIndexPage extends BasicIndexPage<Careplan> {

    private animals = Animal.all();

    constructor() {
        super(new CareplansRepository());
    }

    connectedCallback() {
        super.connectedCallback();
        this.attachListenerToDuplicateButtons();
    }

    /**
     * Event for Duplicate Button
     * @param {HTMLButtonElement} button 
     */
    private addDuplicateEventToButton(button: HTMLButtonElement){
        let func = (event: any) => {
            console.log(event);
            let rep = this.repository as CareplansRepository;
            rep.duplicate(event.path[0].dataset.id).then((result) => {
                if(result) {
                    bulmaToast.toast({
                        message: 'Behandplungsplan erfolgreich dupliziert',
                        type: 'is-success',
                        dismissible: false,
                        position: "bottom-center",
                        animate: { in: 'fadeIn', out: 'fadeOut' },
                    })
                    let list = this.getVetproviehList();
                    list._filterObjects();

                } else {
                    bulmaToast.toast({
                        message: 'Behandplungsplan konnte nicht dupliziert werden',
                        type: 'is-danger',
                        dismissible: false,
                        position: "bottom-center",
                        animate: { in: 'fadeIn', out: 'fadeOut' },
                    })
                }
            })
        }
        func.bind(this);

        button.addEventListener("click", func);
    }


    /**
     * Attaching Event to Buttons
     */
    private attachListenerToDuplicateButtons() {
        let list = this.getVetproviehList();
        var self = this;
        list.addEventListener("loaded", () => {
            list.shadowRoot?.querySelectorAll("button").forEach((button) => {
                self.addDuplicateEventToButton(button);
            })
            list.shadowRoot?.querySelectorAll("p.animal").forEach((p) => {
                self.replaceAnimalCode(p as HTMLParagraphElement);
            })
        })
    }

    private replaceAnimalCode(paragraph: HTMLParagraphElement){
        let animal = this.animals.filter((a) => a.code == paragraph.innerHTML)[0];
        if(animal){
            paragraph.innerHTML = animal.name;
        }
    }
}