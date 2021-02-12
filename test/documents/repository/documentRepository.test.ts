
import { Document, DocumentRepository } from '../../../src/documents';

describe('generate UUID', () => {
    let regex = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);

    it('should match a uuid', () => {
        let uuid = DocumentRepository.generateUUID();
        expect(uuid).toMatch(regex);
    });

    it('should generate unique uuids', () => {
        let uuid1 = DocumentRepository.generateUUID();
        let uuid2 = DocumentRepository.generateUUID();

        expect(uuid1).not.toEqual(uuid2);
    });
});