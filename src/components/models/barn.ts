import { BasicModel } from "./basic";
import { Address } from "./address";
import { GpsCoordinates } from "./gpsCoordinates";
import { Farmer } from "./farmer";

export class Barn extends BasicModel {
    address: Address = new Address();
    deleted: number = 0;
    gpsCoordinates: GpsCoordinates = new GpsCoordinates();
    vvvoNumber: string = "";
    animal = {}
    farmer: Farmer = new Farmer();
}