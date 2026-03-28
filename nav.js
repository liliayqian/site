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

            // Keep main padding-top in sync with the actual header height
            function updateMainPadding() {
                const headerEl = document.querySelector("header");
                const mainEl   = document.querySelector("main");
                if (headerEl && mainEl) {
                    mainEl.style.paddingTop = headerEl.offsetHeight + 20 + "px";
                }
            }
            updateMainPadding();
            window.addEventListener("resize", updateMainPadding);

            function openMenu() {
                overlay.classList.add("is-open");
                overlay.setAttribute("aria-hidden", "false");
                hamburger.setAttribute("aria-expanded", "true");
                document.body.classList.add("menu-open");
                document.body.style.overflow = "hidden";
            }

            function closeMenu() {
                overlay.classList.remove("is-open");
                overlay.setAttribute("aria-hidden", "true");
                hamburger.setAttribute("aria-expanded", "false");
                document.body.classList.remove("menu-open");
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
