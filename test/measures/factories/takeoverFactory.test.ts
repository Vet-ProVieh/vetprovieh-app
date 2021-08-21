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

let buildMeasure = function (barnId: number, withData: boolean = false, animalNumber: string = "SON"): Measure {
    let measure = new Measure();
    measure.id = 1;
    measure.therapyFrequency = "1";
    measure.measuresDate = "2021-08-21";
    measure.animalNumber = animalNumber;
    measure.barn = new Barn();
    measure.barn.id = barnId;
    measure.data = [
        buildGroup("gruppe1", 1, withData),
        buildGroup("gruppe2", 2, withData)
    ];
    return measure;
}


let oldMeasure: Measure = buildMeasure(1, true);
let differentMeasure = buildMeasure(2, true);

let repository = new MeasuresRepository();
let factory: TakeoverFactory;

describe('takeover from last measure', () => {
    let expectFields = function (done: Function, expecationFunction: Function) {
        factory.takeoverFromLatestMeasure().then((result) => {
            result.data.forEach((group) => {
                group.details.forEach((field) => {
                    expecationFunction(field);
                })
            })
            done();
        }).catch((error) => {
            done(error);
        })
    }

    describe('found last measure', () => {
        beforeAll(() => {
            fetch.mockIf(/service\/measures\/barn\/1\/last/, JSON.stringify(oldMeasure));
            factory = new TakeoverFactory(buildMeasure(1, false), repository);
        });

        describe('validate data', () => {
            it('should assign right field values', (done) => {
                expectFields(done, (field: MeasureField) => {
                    expect(field.value).toEqual(`${field.name}${field.position}`);
                })
            });
        });
    });

    describe('found a different last measure', () => {
        describe('different barn', () => {
            beforeAll(() => {
                fetch.mockIf(/service\/measures\/barn\/2\/last/, JSON.stringify(oldMeasure));
                factory = new TakeoverFactory(buildMeasure(2, false), repository);
            });
            it('should not add anything', (done) => {
                expectFields(done, (field: MeasureField) => {
                    expect(field.value).toEqual(undefined);
                })
            });
        });

        describe('different animal Type', () => {
            beforeAll(() => {
                fetch.mockIf(/service\/measures\/barn\/2\/last/, JSON.stringify(differentMeasure));
                factory = new TakeoverFactory(buildMeasure(2, false, "XX"), repository);
            });
            it('should not add anything', (done) => {
                expectFields(done, (field: MeasureField) => {
                    expect(field.value).toEqual(undefined);
                })
            });
        });
    });

    describe('found no measure', () => {
        beforeAll(() => {
            factory = new TakeoverFactory(buildMeasure(3, false), repository);
        });
        it('should not add anything', (done) => {
            expectFields(done, (field: MeasureField) => {
                expect(field.value).toEqual(undefined);
            })
        });
    });
});