import { Barn } from "../../../src/barns";
import { Measure, MeasureField, MeasureGroup, MeasuresRepository, TakeoverFactory } from "../../../src/measures";
import fetch, { enableFetchMocks } from 'jest-fetch-mock';

enableFetchMocks();



let buildField = function (name: string, position: number, withData: boolean): MeasureField {
    let field1 = new MeasureField();
    field1.name = name;
    field1.position = position;
    if (withData) field1.value = `${name}${position}`;
    return field1;
}

let buildGroup = function (name: string, position: number, withData: boolean): MeasureGroup {
    let group = new MeasureGroup();
    group.position = position;
    group.name = name;

    group.details = [
        buildField("test", 1, withData),
        buildField("Feld3333", 2, withData)
    ]

    return group;
}

let buildMeasure = function (barnId: number, withData: boolean = false): Measure {
    let measure = new Measure();
    measure.id = 1;
    measure.therapyFrequency = "1";
    measure.measuresDate = "2021-08-21";
    measure.animalNumber = "SON";
    measure.barn = new Barn();
    measure.barn.id = barnId;
    measure.data = [
        buildGroup("gruppe1", 1, withData),
        buildGroup("gruppe2", 1, withData)
    ];
    return measure;
}


let oldMeasure: Measure = buildMeasure(1, true);
let differentMeasure = buildMeasure(2, true);

let repository = new MeasuresRepository();
let factory : TakeoverFactory;

describe('takeover from last measure', () => {
    describe('found last measure', () => {
        beforeAll(() => {
            fetch.mockIf(/service\/measures\/barn\/1\/last/,JSON.stringify(oldMeasure));
            factory = new TakeoverFactory(buildMeasure(1, false), repository);
        });

        describe('validate data', () => {
            it('should assign right field values', () => {
                factory.takeoverFromLatestMeasure()
            });
        });
    });

    describe('found a different last measure', () => {
        describe('different barn', () => {
            it('should not add anything', () => {

            });
        });

        describe('different animal Type', () => {
            it('should not add anything', () => {

            });
        });
    });

    describe('found no measure', () => {
        it('should not add anything', () => {

        });
    });
});