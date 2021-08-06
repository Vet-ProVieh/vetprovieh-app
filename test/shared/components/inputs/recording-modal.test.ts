

import { RecordingImageModal } from '../../../../src/shared';

describe('close', () => {
    let genModal = function () {
        let modal = new RecordingImageModal();
        modal.connectedCallback();
        modal.active = true;
        return modal;
    };

    it('should close modal', () => {
        let modal = genModal();
        let modalBox = modal.getByIdFromShadowRoot("modal");

        expect(modal.active).toEqual(true);
        expect(modalBox?.classList.contains("is-active")).toEqual(true);
        
        modal.close();

        expect(modal.active).toEqual(false);
        expect(modalBox?.classList.contains("is-active")).toEqual(false);
    });

    describe('close by button with no takeover', () => {

        it('should close modal', () => {
            let modal = genModal();
            let modalBox = modal.getByIdFromShadowRoot("modal");
            let closeButton = modal.getByIdFromShadowRoot("closeButton")

            expect(modal.active).toEqual(true);
            expect(modalBox?.classList.contains("is-active")).toEqual(true);
            expect(closeButton).not.toEqual(undefined);

            closeButton?.click();

            expect(modal.active).toEqual(false);
            expect(modalBox?.classList.contains("is-active")).toEqual(false);
        });

        it('should have expected close event', () => {
            let modal = genModal();
            let closeButton = modal.getByIdFromShadowRoot("closeButton")

            modal?.addEventListener("change", (event: any) => {
                expect(event.detail.takeover).toEqual(false);
                expect(event.detail.content).toEqual(undefined);
            })

            closeButton?.click();
        });
    });

    describe('close by takeover', () => {

        it('should have expected close event', () => {
            let modal = genModal();
            let takeoverButton = modal.getByIdFromShadowRoot("takeoverButton")

            modal?.addEventListener("change", (event: any) => {
                expect(event.detail.takeover).toEqual(true);
                expect(event.detail.content).not.toEqual(undefined);
            })

            takeoverButton?.click();
        });
    });

});

