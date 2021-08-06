
import { VetproviehVideo } from '../../../../src/shared/components/inputs/includes/vetprovieh-video';
import { RecordingModal } from '../../../../src/shared/components/inputs/includes/recording-modal';

describe('type=image', () => {

    let genImage = () => {
        let v = new VetproviehVideo();
        v.type = "image";
        v.connectedCallback();
        return v;
    }

    describe('rendering', () => {
        it('should have openButton', () => {
            let image = genImage();
            let button = image.getByIdFromShadowRoot("openButton");

            expect(button).not.toEqual(undefined);
            expect(button?.textContent).toEqual("Video aufnehmen")
        });

        it('should render no content', () => {
            let image = genImage();

            expect(image.shadowRoot?.innerHTML).toMatch("Es wurde noch nichts aufgenommen.");
        });

    });

    describe('open', () => {
        it('should open Modal', () => {
            let image = genImage();
            let button = image.getByIdFromShadowRoot("openButton");
            let modal = image.getByIdFromShadowRoot("recordingModal") as RecordingModal;

            button?.click();

            expect(modal?.active).toEqual(true);
        });
    });
});


describe('type=video', () => {

    let genVideo = () => {
        let v = new VetproviehVideo();
        v.connectedCallback();
        return v;
    }


    it('should be type video', () => {
        let video = genVideo();
        expect(video.type).toEqual("video");
    });

    describe('rendering', () => {

        it('should have openButton', () => {
            let video = genVideo();
            let button = video.getByIdFromShadowRoot("openButton");

            expect(button).not.toEqual(undefined);
            expect(button?.textContent).toEqual("Video aufnehmen")
        });

        it('should render no content', () => {
            let video = genVideo();

            expect(video.shadowRoot?.innerHTML).toMatch("Es wurde noch nichts aufgenommen.");
        });
    });
});