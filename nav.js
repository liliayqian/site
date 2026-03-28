document.addEventListener("DOMContentLoaded", function () {
    fetch("nav.html")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById("navbar-container").innerHTML = data;

            // Highlight the active page link
            const currentPage = window.location.pathname.split("/").pop() || "index.html";
            document.querySelectorAll("#main-nav a").forEach(link => {
                if (link.getAttribute("href") === currentPage) {
                    link.classList.add("active");
                }
            });

            // Hamburger toggle
            const hamburger = document.getElementById("hamburger-btn");
            const nav = document.getElementById("main-nav");

            hamburger.addEventListener("click", function () {
                const isOpen = nav.classList.toggle("nav-open");
                hamburger.classList.toggle("is-open", isOpen);
                hamburger.setAttribute("aria-expanded", isOpen);
            });

            // Close menu when a nav link is clicked (useful on mobile)
            nav.querySelectorAll("a").forEach(link => {
                link.addEventListener("click", () => {
                    nav.classList.remove("nav-open");
                    hamburger.classList.remove("is-open");
                    hamburger.setAttribute("aria-expanded", false);
                });
            });
        })
        .catch(error => console.error("Error loading navigation:", error));
});
