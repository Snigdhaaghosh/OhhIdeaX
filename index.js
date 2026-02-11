document.addEventListener("DOMContentLoaded", function () {

    const dashboard = document.getElementById("dashboardPage");
    const masterclass = document.getElementById("masterclassPage");
    const documentsBtn = document.getElementById("documentsNavBtn");
    const homeBtn = document.querySelector(".nav-item.active");
    const floating = document.getElementById("floatingElements");

    // SHOW MASTERCLASS
    documentsBtn.addEventListener("click", function () {
        dashboard.style.display = "none";
        masterclass.style.display = "block";
        floating.style.display = "none";
    });

    // SHOW DASHBOARD (Home click)
    homeBtn.addEventListener("click", function () {
        dashboard.style.display = "block";
        masterclass.style.display = "none";
        floating.style.display = "flex";
    });

});

    // ===== MODAL FUNCTIONALITY =====
    const modal = document.getElementById("mcModal");
    const closeBtn = document.getElementById("mcModalClose");
    const overlay = document.getElementById("mcModalOverlay");

    // Open modal when clicking any course card
    document.querySelectorAll(".mc-course-card").forEach(card => {
        card.addEventListener("click", () => {
            modal.classList.add("active");
        });
    });

    // Close modal (X button)
    closeBtn.addEventListener("click", () => {
        modal.classList.remove("active");
    });

    // Close modal (overlay click)
    overlay.addEventListener("click", () => {
        modal.classList.remove("active");
    });