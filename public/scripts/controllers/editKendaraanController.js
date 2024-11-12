class EditKendaraanController {
    constructor() {
        this.form = $('#edit-kendaraan-form');
        this.initialize();
    }

    initialize() {
        const kendaraanId = new URLSearchParams(window.location.search).get('id');
        KendaraanService.getKendaraanById(kendaraanId, (kendaraan) => {
            $('#kendaraan_id').val(kendaraan.id);
            $('#registration_number').val(kendaraan.registration_number);
            $('#owner_name').val(kendaraan.owner_name);
            $('#brand').val(kendaraan.brand);
            $('#production_year').val(kendaraan.production_year);
            $('#cilinder_capacity').val(kendaraan.cilinder_capacity);
            $('#color').val(kendaraan.color_id);
            $('#fuel').val(kendaraan.fuel);
        });

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
            KendaraanService.updateKendaraan(kendaraanData, (response) => {
                alert(response.message);
                window.location.href = '../../views/listKendaraan.html';
            });
        });
    }
}

$(document).ready(() => {
    new EditKendaraanController();
});
