import { BaseRepository } from "@tomuench/vetprovieh-shared/lib";
import { Measure } from "../models";

export class MeasuresRepository extends BaseRepository<Measure>{

  constructor() {
    super("/service/measures");
  }

  /**
   * Open Measures for Barn
   * @param barnId 
   * @returns 
   */
  openMeasuresForBarn(barnId: number): Promise<Measure[]> {
    return fetch(`/service/barns/${barnId}/currentMeasures/`)
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw Error(response.statusText);
        }
      }).catch((error) => {
        return [];
      });
  }
  /**
    * Suche mit Parametern
    * @param {{ [Identifier: string]: string }} params 
    * @returns Promise<T[]>
    */
  whereByParams(params: { [Identifier: string]: string }) : Promise<Measure[]> {
    if(params.type == "open"){
      return this.openMeasuresForBarn(+params.barnId);
    } else {
      return super.whereByParams(params);
    }
  }

  /**
   * Get last filledout Measure for Barn
   * @param {number} barnId
   * @returns {Promise<Measure>}
   */
  lastforBarn(barnId: number): Promise<Measure> {
    return fetch(`${this.endpoint}/barn/${barnId}/last`)
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw Error(response.statusText);
        }
      }).catch((error) => {
        return undefined;
      });
  }

  /*
  all(): Promise<Measure[]>{
      const tmp = new Promise<Measure[]>((resolve, reject) => {
          resolve(JSON.parse(`[{
              "id": "1",
              "animal": "HM1",
              "animalNumber": "string",
              "barn": {
                "address": {
                  "city": "Musterstadt",
                  "postalCode": "1234",
                  "streetName": "Musterstraße",
                  "streetNumber": "1"
                },
                "deleted": 0,
                "gpsCoordinates": {
                  "latitude": 0,
                  "longitude": 0
                },
                "id": 0,
                "vvvoNumber": "123456789",
                "animal": "HM1",
                "farmer": {
                  "address": {
                    "city": "Osnabrück",
                    "postalCode": "49080",
                    "streetName": "Schlosswall",
                    "streetNumber": "1"
                  },
                  "deleted": 0,
                  "gpsCoordinates": {
                    "latitude": 0,
                    "longitude": 0
                  },
                  "id": 0,
                  "vvvoNumber": "string",
                  "contactPerson": {
                    "firstName": "Max",
                    "landline": "string",
                    "lastName": "Mustermann",
                    "mobile": "string"
                  },
                  "name": "string",
                  "veterinarian": {
                    "deleted": 0,
                    "email": "vet@mustermmann.de",
                    "firstName": "Vet",
                    "id": 0,
                    "keycloakId": "string",
                    "lastName": "Musterarzt",
                    "tenant": {
                      "address": {
                        "city": "Musterstadt",
                        "country": "DE",
                        "postalCode": "49080",
                        "streetName": "Musterstraße",
                        "streetNumber": "8"
                      },
                      "credentials": [
                        {
                          "id": 0,
                          "name": "string",
                          "password": "string",
                          "passwordIsSet": true,
                          "username": "string"
                        }
                      ],
                      "id": 0,
                      "isEnabled": true,
                      "name": "string",
                      "name2": "string",
                      "users": [
                        "string"
                      ],
                      "vvvoNumber": "string",
                      "enabled": true
                    },
                    "userName": "string"
                  }
                },
                "lastVet": {
                  "deleted": 0,
                  "email": "string",
                  "firstName": "Max",
                  "id": 0,
                  "keycloakId": "string",
                  "lastName": "Mustervet",
                  "tenant": {
                    "address": {
                      "city": "Musterstadt",
                      "country": "DE",
                      "postalCode": "49000",
                      "streetName": "Musterstraße",
                      "streetNumber": "1"
                    },
                    "credentials": [
                      {
                        "id": 0,
                        "name": "string",
                        "password": "string",
                        "passwordIsSet": true,
                        "username": "string"
                      }
                    ],
                    "id": 0,
                    "isEnabled": true,
                    "name": "string",
                    "name2": "string",
                    "users": [
                      "string"
                    ],
                    "vvvoNumber": "string",
                    "enabled": true
                  },
                  "userName": "string"
                },
                "lastVisit": "2021-06-15",
                "name": "string"
              },
              "data": [
                {
                  "active": true,
                  "details": [
                    {
                      "choices": [
                        "Zwangslüftung",
                        "Deckenlüftung",
                        "Türganglüftung",
                        "freie Lüftung"
                      ],
                      "detailsType": "detailsList",        
                      "name": "Lüftungstechnik",
                      "optional": true,
                      "position": 1,
                      "value": "Zwangslüftung",
                      "voiceInputable": true
                    },
                    {
                      "choices": [
                        "Zwangslüftung",
                        "Deckenlüftung",
                        "Türganglüftung",
                        "freie Lüftung"
                      ],
                      "detailsType": "detailsList",        
                      "name": "Lüftungstechnik",
                      "optional": true,
                      "position": 2,
                      "value": "Deckenöüftung",
                      "voiceInputable": true
                    }
                  ],     
                  "name": "Angaben zur Klimatechnik",
                  "position": 1
                },
                {
                  "active": true,
                  "details": [
                    {
                      "choices": [
                        "Breiautomat",
                        "Trockenautomat",
                        "Flüssigfütterung",
                        "mehlförmig",
                        "granuliert",
                        "pelletiert"
                      ],
                      "detailsType": "detailsList",        
                      "name": "Fütterversorgung",
                      "optional": true,
                      "position": 1,
                      "value": "Breiautomat",
                      "voiceInputable": true
                    },
                    {
                      "choices": [
                        "Breiautomat",
                        "Trockenautomat",
                        "Flüssigfütterung",
                        "mehlförmig",
                        "granuliert",
                        "pelletiert"
                      ],
                      "detailsType": "detailsList",        
                      "name": "Fütterversorgung",
                      "optional": true,
                      "position": 2,
                      "value": "granuliert",
                      "voiceInputable": true
                    },
                    {
                      "choices": [
                        "Brunnenwasser",
                        "Stadtwasser",
                        "Wasseruntersuchung"           
                      ],
                      "detailsType": "detailsList",        
                      "name": "Wasserversorgung",
                      "optional": true,
                      "position": 3,
                      "value": "Stadtwasser",
                      "voiceInputable": true
                    }
                  ],     
                  "name": "Angaben zu Futter und Wasserversorgung",
                  "position": 2
                }
              ],
              "focusOfDiseases": "string",
              "isBlueprint": true,
              "measuresDate": "2021-06-05",
              "objectives": [
                {
                  "active": true,    
                  "keyResults": [
                    {
                      "active": true,      
                      "milestones": "Current",
                      "name": "Einstreuwchsel",
                      "value": "100",
                      "position": 0
                    },
                     {
                      "active": true,      
                      "milestones": "Start",
                      "name": "Klimakontrolle",
                      "value": "0",
                      "position": 1
                    },
                    {
                      "active": true,      
                      "milestones": "Target",
                      "name": "Futterumstellung",
                      "value": "1000",
                      "position": 2
                    }
                  ],
                  "name": "Fußballengesundheit verbessern",
                  "position": 0
                }
              ],
              "therapyFrequency": "string"
            }]`));
      })
      return tmp;
  }*/
}