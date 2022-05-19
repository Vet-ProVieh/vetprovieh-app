import {Measure, MeasureField, MeasureGroup} from '../models';
import {MeasuresRepository} from '../repository';

/**
 * Takeover from one measure to another
 */
export class TakeoverFactory {
    private currentObject: Measure;
    private repository: MeasuresRepository

    /**
     * Default-Constructor
     * @param {Measure} measure
     * @param {MeasuresRepository} repository
     */
    constructor(measure: Measure, repository: MeasuresRepository) {
      this.currentObject = measure;
      this.repository = repository;
    }

    /**
     * Can load LastMeasure?
     * @return {boolean}
     */
    private get canLoadMeasure(): boolean {
      return !!this.currentObject ?.barn ?.id;
    }

    /**
     * Checks if the incoming Measure is valid
     * @param {Measure} measure
     * @return {boolean}
     */
    private isValidMeasure(measure: Measure): boolean {
      return this.currentObject.barn ?.id == measure.barn ?.id &&
            this.currentObject.animalNumber == measure.animalNumber;
    }

    /**
     * Loading latest Measure from server and transfer it to the current
     * @return {Promise<Measure>}
     */
    public takeoverFromLatestMeasure(): Promise<Measure> {
      return new Promise((resolve, reject) => {
        if (this.canLoadMeasure) {
          this.repository.lastforBarn(+this.currentObject.barn.id)
              .then((oldMeasure: Measure) => {
                if (this.isValidMeasure(oldMeasure)) {
                  this.takeoverFrom(oldMeasure);
                }
                resolve(this.currentObject);
              }).catch((error) => {
                reject(error);
              });
        } else {
          resolve(this.currentObject);
        }
      });
    }

    /**
     * Takeover Measure
     * @param {Measure} oldMeasure
     */
    private takeoverFrom(oldMeasure: Measure) {
      oldMeasure.data.forEach((group: MeasureGroup) => {
        this.takeoverGroup(group);
      });
    }

    /**
     * Take over group
     * @param {MeasureGroup} group
     */
    private takeoverGroup(group: MeasureGroup) {
      const currentGroup = this.getGroupFromObject(group);
      if (currentGroup) {
        group.details.forEach((field: MeasureField) => {
          this.takeOverField(currentGroup, field);
        });
      }
    }

    /**
     * Getting Group by Position from currentObject
     * @param {MeasureGroup} group
     * @return {MeasureGroup}
     */
    private getGroupFromObject(group: MeasureGroup): MeasureGroup {
      return this.currentObject.data.filter((g: MeasureGroup) => {
        return g.position === group.position;
      })[0];
    }

    /**
     * Take over a field
     * @param {MeasureGroup} currentGroup
     * @param {MeasureField} field
     */
    private takeOverField(currentGroup: MeasureGroup, field: MeasureField) {
      const currentField = currentGroup.details.filter((f) => f.position == field.position)[0];
      if (currentField) {
        currentField.value = field.value;
      }
    }
}
