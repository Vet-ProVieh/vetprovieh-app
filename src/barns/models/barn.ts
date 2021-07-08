import { Farmer } from "../../farmers";
import { BasicModel, Address, GpsCoordinates } from "../../shared";
import { User } from "../../users/models";


export class Barn extends BasicModel {
    address: Address = new Address();
    deleted: number = 0;
    gpsCoordinates: GpsCoordinates = new GpsCoordinates();
    vvvoNumber: string = "";
    animal: string = "";
    lastVet: User | undefined;
    farmer: Farmer = new Farmer();
}