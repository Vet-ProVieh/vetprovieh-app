import { BasicModel } from "../../components/models/basic";
import { Address } from "../../components/models/address";
import { GpsCoordinates } from "../../components/models/gpsCoordinates";
import { Farmer } from "../../farmers";


export class Barn extends BasicModel {
    address: Address = new Address();
    deleted: number = 0;
    gpsCoordinates: GpsCoordinates = new GpsCoordinates();
    vvvoNumber: string = "";
    animal = {}
    farmer: Farmer = new Farmer();
}