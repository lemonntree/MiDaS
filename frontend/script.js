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
