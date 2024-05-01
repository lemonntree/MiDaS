

// Event listener for the "Upload Image" button
document.addEventListener("DOMContentLoaded", function() {
document.getElementById("uploadButton").addEventListener("click", function() {
    var input = document.getElementById("imageUploadInput");
    var file = input.files[0];

    if (file) {
        // Create a FormData object
        var formData = new FormData();
        formData.append("image", file);

        // Send a POST request to the server to upload the file
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://127.0.0.1:5000/upload_image", true); // Modify the URL here
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                alert("Image uploaded successfully!");
            }
        };
        xhr.send(formData);
    } else {
        alert("Please select an image to upload.");
    }
});});

// Event listener for the "Execute Command" button
document.getElementById("executeButton").addEventListener("click", function() {
    // Make an AJAX request to the Python backend
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:5000/execute_command", true); // Modify the URL here
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Handle the response from the Python backend
            alert(xhr.responseText);
        }
    };
    xhr.send();
});
