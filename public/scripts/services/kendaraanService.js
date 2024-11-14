class KendaraanService {
    static baseURL = "https://datakendaraanapi-production.up.railway.app/api/kendaraan";
    static fetchKendaraanData(callback, filters = {}) {
        $.ajax({
            url: `${this.baseURL}`,
            method: 'GET',
            data: filters,
            success: function (response) {
                callback(response.response_data);
            },
            error: function (xhr, status, error) {
            const responseMessage = xhr.responseJSON ? xhr.responseJSON.response_message : 'An error occurred';
            console.log('Error adding data:', responseMessage);

            alert(responseMessage);
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
                const responseMessage = xhr.responseJSON ? xhr.responseJSON.response_message : 'An error occurred';
                console.log('Error adding data:', responseMessage);
                alert(responseMessage);
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
                const responseMessage = xhr.responseJSON ? xhr.responseJSON.response_message : 'An error occurred';
                console.log('Error adding data:', responseMessage);
                alert(responseMessage);
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
                // Parse the response to get the message
                const responseMessage = xhr.responseJSON ? xhr.responseJSON.response_message : 'An error occurred';
                // Log the error message
                console.log('Error editing data:', responseMessage);

                // Optionally, show it in an alert or on the page
                alert(responseMessage);
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
                // Parse the response to get the message
                const responseMessage = xhr.responseJSON ? xhr.responseJSON.response_message : 'An error occurred';
                // Log the error message
                console.log('Error deleting data:', responseMessage);

                // Optionally, show it in an alert or on the page
                alert(responseMessage);
            }
        });
    }
}
