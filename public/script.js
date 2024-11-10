document.addEventListener('DOMContentLoaded', function() {
    fetch('https://datakendaraanapi-production.up.railway.app/api/kendaraan')
        .then(response => response.json())
        .then(data => {
            const kendaraanList = data.response_data;
            const tableBody = document.getElementById('kendaraanTable').getElementsByTagName('tbody')[0];

            kendaraanList.forEach(kendaraan => {
                const row = tableBody.insertRow();

                const cell1 = row.insertCell(0);
                const cell2 = row.insertCell(1);
                const cell3 = row.insertCell(2);
                const cell4 = row.insertCell(3);
                const cell5 = row.insertCell(4);
                const cell6 = row.insertCell(5);
                const cell7 = row.insertCell(6);

                cell1.textContent = kendaraan.registration_number;
                cell2.textContent = kendaraan.owner_name;
                cell3.textContent = kendaraan.brand;
                cell4.textContent = kendaraan.production_year;
                cell5.textContent = kendaraan.cilinder_capacity;
                cell6.textContent = kendaraan.color_id;
                cell7.textContent = kendaraan.fuel;
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
