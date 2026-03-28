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

            // Highlight the active page link in both navs
            const currentPage = window.location.pathname.split("/").pop() || "index.html";
            document.querySelectorAll("nav a").forEach(link => {
                if (link.getAttribute("href") === currentPage) {
                    link.classList.add("active");
                }
            });

            const hamburger = document.getElementById("hamburger-btn");
            const overlay   = document.getElementById("mobile-menu-overlay");
            const closeBtn  = document.getElementById("close-menu-btn");

            function openMenu() {
                overlay.classList.add("is-open");
                overlay.setAttribute("aria-hidden", "false");
                hamburger.setAttribute("aria-expanded", "true");
                document.body.style.overflow = "hidden"; // prevent background scroll
            }

            function closeMenu() {
                overlay.classList.remove("is-open");
                overlay.setAttribute("aria-hidden", "true");
                hamburger.setAttribute("aria-expanded", "false");
                document.body.style.overflow = "";
            }

            hamburger.addEventListener("click", openMenu);
            closeBtn.addEventListener("click", closeMenu);

            // Close when a nav link is clicked
            overlay.querySelectorAll("a").forEach(link => {
                link.addEventListener("click", closeMenu);
            });
        })
        .catch(error => console.error("Error loading navigation:", error));
});
