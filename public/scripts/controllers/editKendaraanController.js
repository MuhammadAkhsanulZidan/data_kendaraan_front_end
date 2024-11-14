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
            $('#color_id').val(kendaraan.color_id);
            $('#fuel').val(kendaraan.fuel);
            $('#owner_address').val(kendaraan.owner_address);
        });

        this.form.on('submit', (event) => {
            event.preventDefault();
            const productionYear = $('#production_year').val();
            
            // Validate that the production year is 4 digits
            if (productionYear.length !== 4 || isNaN(productionYear)) {
                alert('Tahun Pembuatan harus 4 digit!');
                return; 
            }
            const kendaraanData = {
                registration_number: $('#registration_number').val(),
                owner_name: $('#owner_name').val(),
                brand: $('#brand').val(),
                production_year: $('#production_year').val(),
                cilinder_capacity: $('#cilinder_capacity').val(),
                color_id: $('#color_id').val(),
                fuel: $('#fuel').val(),
                owner_address: $('#owner_address').val(),
            };
            KendaraanService.updateKendaraan(kendaraanData, (response) => {
                alert("Berhasil diedit");
                window.location.href = '../../kendaraan/';
            });
        });
    }
}

$(document).ready(() => {
    new EditKendaraanController();
});
