import { FieldGenerator } from '../../../../src/careplans/settings';
import { FieldOptions } from '../../../../src/careplans/settings/models/field_options';

describe('isRegistered', () => {
    it('should register fields - "comboBox"', () => {
        let field = "comboBox";
        expect(FieldGenerator.isRegistered(field)).toEqual(true);
    });
    it('should register fields - "list" ', () => {
        let field = "careplanList";
        expect(FieldGenerator.isRegistered(field)).toEqual(true);
    });
    it('should register fields - "image" ', () => {
        let field = "image";
        expect(FieldGenerator.isRegistered(field)).toEqual(true);
    });
    it('should register fields - "video"', () => {
        let field = "video";
        expect(FieldGenerator.isRegistered(field)).toEqual(true);
    });
    it('should register fields - "textArea"', () => {
        let field = "textArea";
        expect(FieldGenerator.isRegistered(field)).toEqual(true);
    });
    it('should register fields - "textFields"', () => {
        let field = "textFields";
        expect(FieldGenerator.isRegistered(field)).toEqual(true);
    });
});


describe('generate', () => {
    
    let types: any = {
        textArea: {
            "rows": FieldOptions.INPUT_NUMBER,
            "cols": FieldOptions.INPUT_NUMBER
        },
        textFields: {},
        video: {
            "multiple": FieldOptions.INPUT_CHECKBOX
        },
        image: {
            "multiple": FieldOptions.INPUT_CHECKBOX
        },
        careplanList: {
            "choices": FieldOptions.CUSTOM_CHOICES,
            "choiceSrc": FieldOptions.INPUT_TEXT,
            "multipleSelect": FieldOptions.INPUT_CHECKBOX
        },
        comboBox: {
            "choices": FieldOptions.CUSTOM_CHOICES,
            "choiceSrc": FieldOptions.INPUT_TEXT,
            "multipleSelect": FieldOptions.INPUT_CHECKBOX
        }
    };

    let checkField = function(field: string) {
        let generateFields = FieldGenerator.generate(field)
        let keys = Object.keys(types[field]);
        expect(generateFields.length).toEqual(keys.length);
        keys.forEach((key) => {
            let field = generateFields.find((e: HTMLElement) => e.getAttribute("property") === key);
            expect(field).not.toEqual(undefined);
        })
    }

    it('should generate fields - "comboBox"', () => {
        let field = "comboBox";
        checkField(field);
    });

    it('should generate fields - "list" ', () => {
        let field = "careplanList";
        checkField(field);
    });
    it('should generate fields - "image" ', () => {
        let field = "image";
        checkField(field);
    });
    it('should generate fields - "video"', () => {
        let field = "video";
        checkField(field);
    });
    it('should generate fields - "textArea"', () => {
        let field = "textArea";
        checkField(field);
    });
    it('should generate fields - "textFields"', () => {
        let field = "textFields";
        checkField(field);
    });
});