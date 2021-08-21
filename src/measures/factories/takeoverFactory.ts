import { Measure } from "../models";
import { MeasuresRepository } from "../repository";

/**
 * Takeover from one measure to another
 */
export class TakeoverFactory {

    private currentObject: Measure;
    private repository: MeasuresRepository

    constructor(measure: Measure, repository: MeasuresRepository) {
        this.currentObject = measure;
        this.repository = repository;
    }

    /**
     * Can load LastMeasure?
     * @return {boolean}
     */
    private get canLoadMeasure(): boolean {
        return !!this.currentObject?.barn?.id;
    }

    /**
     * Loading latest Measure from server and transfer it to the current
     * @returns {Promise<Measure>}
     */
    public takeoverFromLatestMeasure() : Promise<Measure> {
        return new Promise((resolve, reject) => {
            if (this.canLoadMeasure) {
                // @ts-ignore get checked by canLoadMeasure
                this.repository.lastforBarn(+this.currentObject.barn.id).then((oldMeasure: Measure) => {
                    this.takeoverFrom(oldMeasure)
                    resolve(this.currentObject);
                }).then((error) => {
                    resolve(this.currentObject);
                });
            } else {
                resolve(this.currentObject);
            }
        });
    }

    private takeoverFrom(oldMeasure: Measure) {
        oldMeasure.data.forEach((group: MeasureGroup) => {
            let currentGroup = this.currentObject.data.filter((g: MeasureGroup) => g.position === group.position)[0];
            if (currentGroup) {
                group.details.forEach((field: MeasureField) => {
                    let currentField = currentGroup.details.filter((f) => f.position == field.position)[0];
                    if (currentField) {
                        currentField.value = field.value;
                    }
                })
            }
        }
    
}