class InfoDialog {
    constructor() {
        this.modalElement = new bootstrap.Modal(document.getElementById('infoDialog'));
        this.messageElement = document.getElementById('infoDialogMessage');
    }

    show(message) {
        this.messageElement.textContent = message;
        this.modalElement.show();
    }
}

export default InfoDialog;
