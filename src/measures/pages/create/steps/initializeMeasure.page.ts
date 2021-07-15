import { VetproviehNavParams, WebComponent } from "@tomuench/vetprovieh-shared/lib";
import { BasicShowPage } from "../../../../shared";
import { BarnListShow } from "../../../../barns";

@WebComponent({
    template: "",
    tag:"initialize-measure"
})
export class InitializeMeasurePage extends HTMLElement {

    public static NAVIGATION_KEY :string = "MeasureIntializeParams";
    
    constructor(){
        super();
    }

    connectedCallback() {
        this.barnShower.attributeChangedCallback("barnid","", VetproviehNavParams.getUrlParameter("barn_id"));

        this.initializeButton.addEventListener("click", () => {
            let date = (document.getElementById("measures-date") as HTMLInputElement).value;
            let freq = (document.getElementById("therapy-frequency") as HTMLInputElement).value;
            VetproviehNavParams.set(InitializeMeasurePage.NAVIGATION_KEY, {
                barnId : VetproviehNavParams.getUrlParameter("barn_id"),
                therapyFrequency: freq,
                measuresDate: date
            });
        });

        this.therapyFrequencySlider.addEventListener("change", () => {
            this.therapyFrequencyText.value = this.therapyFrequencySlider.value;
        })

        this.therapyFrequencyText.addEventListener("keyup", () => {
            this.therapyFrequencySlider.value = this.therapyFrequencyText.value;
            console.log(this.therapyFrequencySlider.value);
        })
    }


    private get initializeButton(): HTMLButtonElement {
        return document.getElementById("btn-new") as HTMLButtonElement;
    }

    private get therapyFrequencySlider(): HTMLInputElement {
        return document.getElementById("therapy-frequency") as HTMLInputElement;
    }

    private get therapyFrequencyText(): HTMLInputElement {
        return document.getElementById("therapy-frequency-text") as HTMLInputElement;
    }

    /**
     * Get BarnShower
     * @return {BarnListShow}
     */
    private get barnShower() : BarnListShow{
        return document.getElementById("barnShower") as BarnListShow;
    }
}