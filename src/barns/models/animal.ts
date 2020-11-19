
export class Animal {
    public code: string; 
    public name: string;

    constructor(code:string, name:string){
        this.code = code;
        this.name = name;
    }

    public static all() : Array<Animal> {
        return TYPES;
    }
}


// Define Types one time
var TYPES = [
    new Animal("SON","Sonstige Tier-/Nutzungsarten, nicht mitteilungspfl."),
    new Animal("RM1","Rinder - Mastkälber bis 8 Mo, mitteilungspflichtig"),
    new Animal("RM2","Rinder - Mast ab 8 Mo, mitteilungspflichtig"),
    new Animal("RN1","Rinder - Mastkälber bis 8 Mo, nicht mitteilungspfl."),
    new Animal("RN2","Rinder - Mast ab 8 Mo, nicht mitteilungspfl."),
    new Animal("RN3","Rinder - sonstige, nicht mitteilungspflichtig"),
    new Animal("SM1","Schweine - Mastferkel bis 30 kg, mitteilungspflichtig"),
    new Animal("SM2","Schweine - Mast über 30 kg, mitteilungspflichtig"),
    new Animal("SN1","Schweine - Mastferkel bis 30 kg, nicht mitteilungspfl."),
    new Animal("SN2","Schweine - Mast über 30 kg, nicht mitteilungspfl."),
    new Animal("SN3","Schweine - sonstige, nicht mitteilungspfl."),
    new Animal("HM1","Hühner - Mast, mitteilungspflichtig"),
    new Animal("HN1","Hühner - Mast, nicht mitteilungspfl."),
    new Animal("HN2","Hühner - sonstige, nicht mitteilungspfl."),
    new Animal("PM1","Puten - Mast, mitteilungspflichtig"),
    new Animal("PN1","Puten - Mast, nicht mitteilungspfl."),
    new Animal("PN2","Puten - sonstige, nicht mitteilungspfl.")
];