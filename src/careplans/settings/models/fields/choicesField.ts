import { CareplanField } from "../careplanField";

/**
 * Field to choose between values
 */
export class ChoicesField extends CareplanField {

    private choices: string[] = []
    public choiceSrc: string = "";

    /**
     * Get Possible Choice-Sources to select
     * @return {string[]}
     */
    public static get choiceSrcs() {
        return CHOICE_SRCS;
    }
}


var CHOICE_SRCS = [
    'MEDS',
    'XXXX'
];