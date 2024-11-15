class AddKendaraanController {
    constructor() {
        this.form = $('#add-kendaraan-form');
        this.initialize();
    }

    initialize() {
        this.form.on('submit', (event) => {
            currentDate = new Date();
            console.log(currentDate);
            currentYear = currentDate.getFullYear();
            event.preventDefault();
            
            // Get the production year value
            const productionYear = $('#production_year').val();
            
            // Validate that the production year is 4 digits
            if (productionYear.length !== 4 || isNaN(productionYear)) {
                alert('Tahun Pembuatan harus 4 digit!');
                return; 
            }

            //should be replaced by current date
            // Date.now.arguments.
            if(Number(productionYear)>Number(currentYear)){
                alert('Tahun pembuatan tidak boleh lebih dari current year');
                return;
            }
            
            // Collect form data
            const kendaraanData = {
                registration_number: $('#registration_number').val(),
                owner_name: $('#owner_name').val(),
                brand: $('#brand').val(),
                production_year: productionYear,
                cilinder_capacity: $('#cilinder_capacity').val(),
                color_id: $('#color_id').val(),
                fuel: $('#fuel').val(),
                owner_address: $('#owner_address').val(),
            };

            // Call the service to add kendaraan
            KendaraanService.addKendaraan(kendaraanData, (response) => {
                alert("Berhasil ditambahkan");
                window.location.href = '../../kendaraan/';
            });
        });
    }
}

$(document).ready(() => {
    new AddKendaraanController();
});
