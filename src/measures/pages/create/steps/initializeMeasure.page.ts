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

    /**
     * Format Date
     * @param {Date} date 
     * @returns {string}
     */
    private formatDate(date: Date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }
     

    connectedCallback() {
        this.barnShower.barnid = VetproviehNavParams.getUrlParameter("barn_id");

        this.datePicker.value = this.formatDate(new Date());
        
        this.initializeButton.addEventListener("click", () => {
            let date = this.datePicker.value;
            let freq = this.therapyFrequencySlider.value;
            VetproviehNavParams.set(InitializeMeasurePage.NAVIGATION_KEY, {
                barnId : VetproviehNavParams.getUrlParameter("barn_id"),
                therapyFrequency: freq,
                measuresDate: date
            });
        });

        this.therapyFrequencySlider.addEventListener("input", () => {
            this.therapyFrequencyText.value = this.therapyFrequencySlider.value;
            console.log("slider input");
        })

        this.therapyFrequencyText.addEventListener("keyup", () => {
            this.therapyFrequencySlider.value = this.therapyFrequencyText.value;
            console.log(this.therapyFrequencySlider.value);
            console.log("textinput");
        })
    }


    private get initializeButton(): HTMLButtonElement {
        return document.getElementById("btn-new") as HTMLButtonElement;
    }

    /**
     * Load DatePicker from DOM
     * @return {HTMLInputElement}
     */
    private get datePicker(): HTMLInputElement {
        return document.getElementById("measures-date") as HTMLInputElement;
    }

    /**
     * Load Therapy-Frequency from DOM
     * @return {HTMLInputElement}
     */
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