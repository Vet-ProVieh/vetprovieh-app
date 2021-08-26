import { Measure, MeasureField, MeasureGroup, ReplaceFactory } from "../../../src/measures";

function buildField(value: string): MeasureField {
    return {
        "detailsType": "textArea",
        "name": "Weitere Berater (Name, Anschrift)",
        "optional": false,
        "position": 8,
        "value": value,
        "voiceInputable": false
    } as MeasureField;
}

// Data for replacement init

let data = {
    barn: {
        name: "Demo",
        city: "Osnabrueck"
    },
    user: {
        firstname: "Max",
        lastname: "Muster"
    }
}


// Factory init and mock
let factory = new ReplaceFactory();
jest.spyOn(factory, 'data', 'get')
    .mockImplementation((): any => data);

// @ts-ignore
jest.spyOn(factory, 'initData')
    .mockImplementation((): Promise<boolean> => {
        return new Promise<boolean>((resolve, reject) => {
            resolve(true);
        })
    });

describe('replacePlaceHolders', () => {
    let measure: Measure = new Measure();
    let group: MeasureGroup = new MeasureGroup();

    beforeEach(() => {
        measure = new Measure();
        group = new MeasureGroup();
        group.details = [
            buildField("{{barn.name}} {{barn.city}}"),
            buildField("{{user.firstname}} {{user.lastname}}")
        ]
        measure.data = [group];
    })

    describe('with empty param', () => {
        it('should reject ', () => {
            expect(factory.replacePlaceholders(undefined)).resolves.toEqual(false)
        });
    });

    describe('with measure', () => {

        describe('user', () => {

            it('should replace placeholders', (done) => {
                factory.replacePlaceholders(measure).then(() => {
                    let field = group.details[1];
                    expect(field.value).toEqual(`${data.user.firstname} ${data.user.lastname}`);
                    done();
                }).catch((error) => done(error));
            });
        });

        describe('barn', () => {

            it('should replace placeholders', (done) => {
                factory.replacePlaceholders(measure).then(() => {
                    let field = group.details[0];
                    expect(field.value).toEqual(`${data.barn.name} ${data.barn.city}`); 
                    done();
                }).catch((error) => done(error));
            });
        });
    });
});