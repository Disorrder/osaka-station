export default class Controller {
    constructor() {
        // this.debug = true;
        this.scene = $('#scene')[0];

        if (this.scene.hasLoaded) {
            this.onStart()
        } else {
            this.scene.addEventListener('loaded', this.onStart.bind(this));
        }

        window.ctrl = this;
    }

    onStart() {
        if (AFRAME.utils.device.isGearVR()
            || AFRAME.utils.device.isMobile()
        ) {
            $('.a-enter-vr-button').click();
        }
    }
}
