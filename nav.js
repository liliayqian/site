document.addEventListener("DOMContentLoaded", function () {
    fetch("nav.html") // Ensure the correct path
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById("navbar-container").innerHTML = data;
        })
        .catch(error => console.error("Error loading navigation:", error));
});
