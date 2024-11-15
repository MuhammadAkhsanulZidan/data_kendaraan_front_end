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
            // Determine the row background color based on color_id
            let rowColorClass = '';
            switch (kendaraan.color_id.toLowerCase()) {
                case 'merah':
                    rowColorClass = 'bg-danger text-white';  // Red
                    break;
                case 'hitam':
                    rowColorClass = 'bg-dark text-white';    // Black
                    break;
                case 'biru':
                    rowColorClass = 'bg-primary text-white'; // Blue
                    break;
                case 'abu-abu':
                    rowColorClass = 'bg-secondary text-white'; // Gray
                    break;
                default:
                    rowColorClass = '';  // Default background
            }

            const row = `
            <tr class="${rowColorClass}">
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
                    <button class="btn btn-info btn-sm edit-button" data-id="${kendaraan.registration_number}">Edit</button>
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
            const modal = new bootstrap.Modal(document.getElementById('customDialog'));
            modal.show();

            $('#confirmDelete').off('click').on('click', function () {
                KendaraanService.deleteKendaraan(id, function (response) {
                    location.reload();
                });
                modal.hide();
                $('#infoDialogMessage').text(message);
                const infoModal = new bootstrap.Modal(document.getElementById('infoDialog'));
                infoModal.show();
            });


            $('.btn-secondary').off('click').on('click', function () {
                modal.hide();
            });

        });
    }
}

$(document).ready(() => {
    const homeController = new HomeController();
    homeController.initialize();
});
