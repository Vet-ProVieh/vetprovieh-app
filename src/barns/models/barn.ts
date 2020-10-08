import { Farmer } from "../../farmers";
import { BasicModel, Address, GpsCoordinates } from "../../shared";


export class Barn extends BasicModel {
    address: Address = new Address();
    deleted: number = 0;
    gpsCoordinates: GpsCoordinates = new GpsCoordinates();
    vvvoNumber: string = "";
    animal: string = "";
    farmer: Farmer = new Farmer();
}