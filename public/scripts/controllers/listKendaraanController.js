class HomeController {
    constructor() {
        this.tableBody = $('#kendaraan-table tbody');
    }

    initialize() {
        const filters = this.getQueryParameters();
        this.mapKendaraanListData(filters);
        $('#search-regnum').val(filters.registration_number);
        $('#search-owner').val(filters.owner_name);
        $('#search-button').on('click', () => this.onSearchClick());
    }

    onSearchClick() {
        const filters = {
            registrationNumber: $('#search-regnum').val(),
            ownerName: $('#search-owner').val()
        };
        this.updateURLWithFilters(filters);  // Update URL with new filters
    }

    getQueryParameters() {
        const params = new URLSearchParams(window.location.search);
        const queryParams = {};

        if (params.has('registration_number')) {
            queryParams.registration_number = params.get('registration_number');
        }

        if (params.has('owner_name')) {
            queryParams.owner_name = params.get('owner_name');
        }

        return queryParams;
    }

    updateURLWithFilters(filters) {
        const searchParams = new URLSearchParams();
        if (filters.registrationNumber) searchParams.set('registration_number', filters.registrationNumber);
        if (filters.ownerName) searchParams.set('owner_name', filters.ownerName);

        window.location.href = `${window.location.pathname}?${searchParams.toString()}`;
    }

    mapKendaraanListData(filters) {
        KendaraanService.fetchKendaraanData((kendaraanList) => {
            this.populateTable(kendaraanList);
        }, filters);
    }

    populateTable(kendaraanList) {
        this.tableBody.empty();  // Clear existing rows

        kendaraanList.forEach((kendaraan, index) => {
            const row = `
                <tr>
                    <td>${index + 1}</td>
                    <td>${kendaraan.registration_number}</td>
                    <td>${kendaraan.owner_name}</td>
                    <td>${kendaraan.brand}</td>
                    <td>${kendaraan.production_year}</td>
                    <td>${kendaraan.cilinder_capacity}</td>
                    <td>${kendaraan.color_id}</td>
                    <td>${kendaraan.fuel}</td>
                    <td>
                        <button class="btn btn-warning btn-sm detail-button" data-id="${kendaraan.registration_number}">Detail</button>
                        <button class="btn  btn-info  btn-sm edit-button" data-id="${kendaraan.registration_number}">Edit</button>
                        <button class="btn btn-danger btn-sm delete-button" data-id="${kendaraan.registration_number}">Delete</button>
                    </td>
                </tr>
            `;

            this.tableBody.append(row);
        });

        $('.detail-button').on('click', (event) => {
            const id = $(event.currentTarget).data('id');
            window.location.href = `../../kendaraan/detail/?id=${id}`;
        });

        $('.edit-button').on('click', (event) => {
            const id = $(event.currentTarget).data('id');
            window.location.href = `../../kendaraan/edit/?id=${id}`;
        });

        $('.delete-button').on('click', (event) => {
            const id = $(event.currentTarget).data('id');
            // Confirm deletion
            if (confirm("Are you sure you want to delete this kendaraan?")) {
                KendaraanService.deleteKendaraan(id, (response) => {
                    alert("Berhasil dihapus");
                    // Optionally, refresh the page or remove the deleted row from the table
                    location.reload(); // or use a function to remove the row dynamically
                });
            }
        });
    }
}

$(document).ready(() => {
    const homeController = new HomeController();
    homeController.initialize();
});
