import { MeasureField, MeasureFieldComponent, MeasureGroup, MeasureGroupComponent } from '../../../src/measures';

let group = new MeasureGroup();
group.details = [
    {
        "choices": [
            "Ja",
            "Nein"
        ],
        "detailsType": "checkBox",
        "name": "Weitere Berater",
        "optional": false,
        "position": 7,
        "value": "",
        "voiceInputable": false
    } as MeasureField,
    {
        "detailsType": "textArea",
        "name": "Weitere Berater (Name, Anschrift)",
        "optional": false,
        "position": 8,
        "value": "",
        "link_position": {
            "id": 7,
            "value": "Ja"
        },
        "voiceInputable": false
    } as MeasureField
]

let groupComponent: MeasureGroupComponent;
let fields: MeasureFieldComponent[];
describe('link fields', () => {
    beforeAll(() => {
        groupComponent = new MeasureGroupComponent();
        groupComponent.object = group;
        groupComponent.connectedCallback();
        fields = (groupComponent as any)["_subfieldBindings"] as MeasureFieldComponent[];
    })

    it('should have fields', () => {
        expect(fields.length).toBeGreaterThan(0);
    });

    describe('correct link', () => {
        it('should link fields', () => {
            expect(fields[1].linkedField).toBeDefined();
            expect(fields[1]?.linkedField?.object).toEqual(fields[0].object)
        });
    });

    describe('incorrect link', () => {
        beforeAll(() => {
            if (group.details[1].link_position) {
                group.details[1].link_position.id = 200;
            }
            groupComponent = new MeasureGroupComponent();
            groupComponent.object = group;
            groupComponent.connectedCallback();
            fields = (groupComponent as any)["_subfieldBindings"] as MeasureFieldComponent[];
        })

        it('should not link together', () => {
            expect(fields[1].linkedField).not.toBeDefined();
        });
    });
});