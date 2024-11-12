class AddKendaraanController {
    constructor() {
        this.form = $('#add-kendaraan-form');
        this.initialize();
    }

    initialize() {
        this.form.on('submit', (event) => {
            event.preventDefault();
            const kendaraanData = {
                registration_number: $('#registration_number').val(),
                owner_name: $('#owner_name').val(),
                brand: $('#brand').val(),
                production_year: $('#production_year').val(),
                cilinder_capacity: $('#cilinder_capacity').val(),
                color: $('#color').val(),
                fuel: $('#fuel').val(),
            };
            KendaraanService.addKendaraan(kendaraanData, (response) => {
                alert(response.message);
                window.location.href = '../../views/listKendaraan.html';
            });
        });
    }
}

$(document).ready(() => {
    new AddKendaraanController();
});
