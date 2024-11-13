class DetailKendaraanController {
    constructor() {
        this.detailsContainer = $('#kendaraan-details');
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
        });

        $('.edit-button').on('click', (event) => {
            window.location.href = `../../kendaraan/edit/?id=${kendaraanId}`;
            
        });
    }
}

$(document).ready(() => {
    new DetailKendaraanController();
});
