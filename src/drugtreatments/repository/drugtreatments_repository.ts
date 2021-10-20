import {BaseRepository} from '@tomuench/vetprovieh-shared/lib';
import { Drugtreatment } from '../models';

export class DrugtreatmentRepository extends BaseRepository<Drugtreatment> {
  constructor() {
    super('/service/drugstreatment');
  }


    /**
     * Find a Object by its id
     * @param {number} id 
     * @return {Promise<T>}
     */
    /*
     find(id: number): Promise<any> {
     
      return new Promise((resolve, reject) => {
        resolve(DEMO_DATEN[0]);
      })
  }
*/
  
    /**
     * Getting All
     * @returns Promise<T[]>
     */
    /*
     all(): Promise<any[]> {
      return new Promise((resolve, reject) => {
        resolve(DEMO_DATEN);
      })
  }
  */
}

/*
var DEMO_DATEN = [{
  "amount": "12 ml",
  "animalNumber": "123",
  "applicationDays": "5",
  "applicationType": "intravenös",
  "drugs": [
    {
      "animalTypes": [
        {
          "animal": "string",
          "animalCode": "string",
          "id": 0
        }
      ],
      "approvalNumber": "string",
      "dose": "string",
      "id": 0,
      "manufacturer": "string",
      "name": "string",
      "registrationNumber": "string"
    }
  ],
  "effectDays": "string",
  "id": 1,
  "isReported": true,
  "measurement": "string",
  "operationPlans": {
    "animal": "HM1",
    "barn": {
      "address": {
        "city": "string",
        "postalCode": "string",
        "streetName": "string",
        "streetNumber": "string"
      },
      "deleted": 0,
      "gpsCoordinates": {
        "latitude": 0,
        "longitude": 0
      },
      "id": 0,
      "vvvoNumber": "string",
      "animal": "HM1",
      "currentMeasures": 0,
      "farmer": {
        "address": {
          "city": "string",
          "postalCode": "string",
          "streetName": "string",
          "streetNumber": "string"
        },
        "deleted": 0,
        "gpsCoordinates": {
          "latitude": 0,
          "longitude": 0
        },
        "id": 0,
        "vvvoNumber": "string",
        "contactPerson": {
          "firstName": "string",
          "landline": "string",
          "lastName": "string",
          "mobile": "string"
        },
        "name": "Franz Meier",
        "veterinarian": {
          "deleted": 0,
          "email": "string",
          "firstName": "string",
          "id": 0,
          "keycloakId": "string",
          "lastName": "string",
          "tenant": {
            "address": {
              "city": "string",
              "country": "string",
              "postalCode": "string",
              "streetName": "string",
              "streetNumber": "string"
            },
            "credentials": [
              {
                "id": 0,
                "name": "string",
                "password": "string",
                "passwordIsSet": true,
                "tenant": "string",
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
        "firstName": "string",
        "id": 0,
        "keycloakId": "string",
        "lastName": "string",
        "tenant": {
          "address": {
            "city": "string",
            "country": "string",
            "postalCode": "string",
            "streetName": "string",
            "streetNumber": "string"
          },
          "credentials": [
            {
              "id": 0,
              "name": "string",
              "password": "string",
              "passwordIsSet": true,
              "tenant": "string",
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
      "lastVisit": "2021-09-29",
      "name": "string",
      "currentMeasure": 0
    },
    "createdAt": "2021-09-29",
    "drugsTreatments": [
      "string"
    ],
    "id": 0,
    "name": "string",
    "opGroups": [
      {
        "active": true,
        "id": 0,
        "isTherapy": true,
        "name": "string",
        "opFields": [
          {
            "choiceSrc": "string",
            "choices": [
              "string"
            ],
            "cols": 0,
            "fieldType": "string",
            "id": 0,
            "multiple": true,
            "multipleSelect": true,
            "name": "string",
            "opGroups": "string",
            "optional": true,
            "position": 0,
            "rows": 0,
            "treatmentKeys": "string",
            "type": "string",
            "updatedAt": "2021-09-29",
            "validators": [
              {
                "id": 0,
                "maxLength": 0,
                "minLength": 0,
                "regex": "string",
                "validatorType": "string"
              }
            ],
            "value": "string",
            "voiceInputable": true
          }
        ],
        "opParentGroups": "string",
        "opPlans": "string",
        "position": 0,
        "subOpGroups": [
          "string"
        ],
        "sOpGroups": [
          "string"
        ]
      }
    ],
    "rating": 0,
    "readOnly": true,
    "updatedAt": "2021-09-29"
  },
  "treatmentDate": "2021-09-29",
  "treatmentType": "string",
  "vetId": "string",
  "waitingDays": "string"
},{
  "amount": "12 ml",
  "animalNumber": "123",
  "applicationDays": "5",
  "applicationType": "intravenös",
  "drugs": [
    {
      "animalTypes": [
        {
          "animal": "string",
          "animalCode": "string",
          "id": 0
        }
      ],
      "approvalNumber": "string",
      "dose": "string",
      "id": 0,
      "manufacturer": "string",
      "name": "string",
      "registrationNumber": "string"
    }
  ],
  "effectDays": "string",
  "id": 2,
  "isReported": true,
  "measurement": "string",
  "operationPlans": {
    "animal": "HM1",
    "barn": {
      "address": {
        "city": "string",
        "postalCode": "string",
        "streetName": "string",
        "streetNumber": "string"
      },
      "deleted": 0,
      "gpsCoordinates": {
        "latitude": 0,
        "longitude": 0
      },
      "id": 0,
      "vvvoNumber": "string",
      "animal": "HM1",
      "currentMeasures": 0,
      "farmer": {
        "address": {
          "city": "string",
          "postalCode": "string",
          "streetName": "string",
          "streetNumber": "string"
        },
        "deleted": 0,
        "gpsCoordinates": {
          "latitude": 0,
          "longitude": 0
        },
        "id": 0,
        "vvvoNumber": "string",
        "contactPerson": {
          "firstName": "string",
          "landline": "string",
          "lastName": "string",
          "mobile": "string"
        },
        "name": "Peter Müller",
        "veterinarian": {
          "deleted": 0,
          "email": "string",
          "firstName": "string",
          "id": 0,
          "keycloakId": "string",
          "lastName": "string",
          "tenant": {
            "address": {
              "city": "string",
              "country": "string",
              "postalCode": "string",
              "streetName": "string",
              "streetNumber": "string"
            },
            "credentials": [
              {
                "id": 0,
                "name": "string",
                "password": "string",
                "passwordIsSet": true,
                "tenant": "string",
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
        "firstName": "string",
        "id": 0,
        "keycloakId": "string",
        "lastName": "string",
        "tenant": {
          "address": {
            "city": "string",
            "country": "string",
            "postalCode": "string",
            "streetName": "string",
            "streetNumber": "string"
          },
          "credentials": [
            {
              "id": 0,
              "name": "string",
              "password": "string",
              "passwordIsSet": true,
              "tenant": "string",
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
      "lastVisit": "2021-09-29",
      "name": "Franz Meier",
      "currentMeasure": 0
    },
    "createdAt": "2021-09-29",
    "drugsTreatments": [
      "string"
    ],
    "id": 0,
    "name": "string",
    "opGroups": [
      {
        "active": true,
        "id": 0,
        "isTherapy": true,
        "name": "string",
        "opFields": [
          {
            "choiceSrc": "string",
            "choices": [
              "string"
            ],
            "cols": 0,
            "fieldType": "string",
            "id": 0,
            "multiple": true,
            "multipleSelect": true,
            "name": "string",
            "opGroups": "string",
            "optional": true,
            "position": 0,
            "rows": 0,
            "treatmentKeys": "string",
            "type": "string",
            "updatedAt": "2021-09-29",
            "validators": [
              {
                "id": 0,
                "maxLength": 0,
                "minLength": 0,
                "regex": "string",
                "validatorType": "string"
              }
            ],
            "value": "string",
            "voiceInputable": true
          }
        ],
        "opParentGroups": "string",
        "opPlans": "string",
        "position": 0,
        "subOpGroups": [
          "string"
        ],
        "sOpGroups": [
          "string"
        ]
      }
    ],
    "rating": 0,
    "readOnly": true,
    "updatedAt": "2021-09-29"
  },
  "treatmentDate": "2021-09-29",
  "treatmentType": "string",
  "vetId": "string",
  "waitingDays": "string"
}]

*/