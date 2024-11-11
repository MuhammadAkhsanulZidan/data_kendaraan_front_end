class KendaraanService {
    static baseURL = "http://localhost:5000/api/kendaraan";
    static fetchKendaraanData(callback, filters = {}) {
        $.ajax({
            url: `${this.baseURL}`,
            method: 'GET',
            data: filters,
            success: function (response) {
                if (response.response_status !== "200 OK") {
                    alert(response.response_message);
                    return;
                }
                callback(response.response_data);
            },
            error: function (xhr, status, error) {
                console.log('Error fetching data:', error);
            }
        });
    }

    static getKendaraanById(id, callback) {
        $.ajax({
            url: `${this.baseURL}/${id}`,
            method: 'GET',
            success: (response) => {
                callback(response.response_data);
            },
            error: (xhr, status, error) => {
                console.log('Error fetching data:', error);
            }
        });
    }

    static addKendaraan(kendaraanData, callback) {
        $.ajax({
            url: `${this.baseURL}`,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(kendaraanData),
            success: (response) => {
                callback(response);
            },
            error: (xhr, status, error) => {
                console.log('Error adding data:', error);
            }
        });
    }

    static updateKendaraan(kendaraanData, callback) {
        $.ajax({
            url: `${this.baseURL}`,
            method: 'PATCH',
            contentType: 'application/json', // Set content type to JSON
            data: JSON.stringify(kendaraanData), // Convert data to JSON string
            success: (response) => {
                callback(response);
            },
            error: (xhr, status, error) => {
                console.log('Error updating data:', error);
            }
        });
    }

    static deleteKendaraan(id, callback) {
        $.ajax({
            url: `${this.baseURL}?registration_number=${id}`,
            method: 'DELETE',
            success: (response) => {
                callback(response);
            },
            error: (xhr, status, error) => {
                console.log('Error deleting data:', error);
            }
        });
    }
}
