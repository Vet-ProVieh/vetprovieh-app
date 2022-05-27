import {ViewHelper} from '@vetprovieh/vetprovieh-shared';
import {BarnsRepository} from '../../barns/repository';
import {UserRepository} from '../../users';
import {Measure, MeasureField, MeasureGroup} from '../models';

/**
 * Replacing Placeholders in MeasureField
 */
export class ReplaceFactory {
    private userRepository : UserRepository | undefined;
    private barnRepository : BarnsRepository = new BarnsRepository();

    private _data: any = {};
    private _barnId: string | number | undefined;

    /**
     * Replacing Placeholders in Measure
     * @param {Measure | undefined} measure
     * @return {boolean}
     */
    public replacePlaceholders(measure: Measure | undefined): Promise<boolean> {
      return new Promise((resolve, reject) => {
        if (measure) {
          console.log('Start replace');
          this._barnId = measure.barn?.id;
          this.initData().then(() => {
            measure.data.forEach((group) => {
              this.replacePlaceholdersInGroup(group);
            });
            resolve(true);
          }).catch((error) => {
            reject(error);
          });
        } else {
          reject(new Error('No Measure'));
        }
      });
    }

    /**
     * Getting data
     * @return {any}
     */
    public get data() : any {
      return this._data;
    }

    /**
     * Replacing Placeholders in Group
     * @param {MeasureGroup} group
     */
    private replacePlaceholdersInGroup(group: MeasureGroup) {
      group.details.forEach((field) => {
        this.replacePlaceholdersInField(field);
      });
    }

    /**
     * Replacing Placeholders in MeasureField
     * @param {MeasureField} field
     */
    private replacePlaceholdersInField(field: MeasureField) {
      const newValue = ViewHelper.replacePlaceholdersInText(
          field.value,
          this.data);
      field.value = newValue;
    }

    /**
     * Daten initailisieren
     * @return {Promise<any>}
     */
    public initData(): Promise<any> {
      const promises = [];
      promises.push(this.loadUser());
      promises.push(this.loadBarn());

      return Promise.all(promises);
    }

    /**
     * Loading User from Server
     * @return {Promise<any>}
     */
    private loadUser(): Promise<any> {
      this.userRepository = new UserRepository();
      return this.userRepository.loadProfile().then((user) => {
        this.data.user = user;
      });
    }

    /**
     * Loading Barn from Server
     * @return {Promise<any>}
     */
    private async loadBarn(): Promise<any> {
      if (this._barnId) {
        return this.barnRepository.find(+this._barnId).then((barn) => {
          this._data.barn = barn;
        });
      } else {
        return false;
      }
    }
}
