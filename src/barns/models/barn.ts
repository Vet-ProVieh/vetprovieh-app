import {Farmer} from '../../farmers';
import {BasicModel, Address, GpsCoordinates} from '../../shared';
import {User} from '../../users/models';

/**
 * Barn-Model
 */
export class Barn extends BasicModel {
    address: Address = new Address();
    deleted = 0;
    gpsCoordinates: GpsCoordinates = new GpsCoordinates();
    vvvoNumber = '';
    animal = '';
    lastVet: User | undefined;

    // Amount of open Measures
    currentMeasure = 0;
    farmer: Farmer = new Farmer();
}
