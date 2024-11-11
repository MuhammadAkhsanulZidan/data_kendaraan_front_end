class DetailKendaraanController {
    constructor() {
        this.detailsContainer = $('#kendaraan-details');
        this.initialize();
    }

    initialize() {
        const kendaraanId = new URLSearchParams(window.location.search).get('id');
        KendaraanService.getKendaraanById(kendaraanId, (kendaraan) => {
            this.detailsContainer.html(`
                <p><strong>Registration Number:</strong> ${kendaraan.registration_number}</p>
                <p><strong>Owner Name:</strong> ${kendaraan.owner_name}</p>
                <p><strong>Brand:</strong> ${kendaraan.brand}</p>
                <p><strong>Production Year:</strong> ${kendaraan.production_year}</p>
                <p><strong>Cylinder Capacity:</strong> ${kendaraan.cilinder_capacity}</p>
                <p><strong>Color:</strong> ${kendaraan.color_id}</p>
                <p><strong>Fuel:</strong> ${kendaraan.fuel}</p>
            `);
        });
    }
}

$(document).ready(() => {
    new DetailKendaraanController();
});
