document.addEventListener("DOMContentLoaded", function () {

    const dashboard = document.getElementById("dashboardPage");
    const masterclass = document.getElementById("masterclassPage");
    const profileBtn = document.getElementById("userProfileBtn");
    const profilePage = document.getElementById("profilePage");
    const documentsBtn = document.getElementById("documentsNavBtn");
    const homeBtn = document.getElementById("homeNavBtn");
    const aiBtn = document.getElementById("aiNavBtn");
    const aiPage = document.getElementById("aiPage");
    const floating = document.getElementById("floatingElements");
    const navItems = document.querySelectorAll(".nav-item");

    /* -----------------------------
       PAGE SWITCHING SYSTEM
    ------------------------------ */

    function removeActive() {
        navItems.forEach(item => item.classList.remove("active"));
        profileBtn.classList.remove("active");
    }

    function hideAllPages() {
        dashboard.style.display = "none";
        masterclass.style.display = "none";
        profilePage.style.display = "none";
        aiPage.style.display = "none";
        document.body.classList.remove("ai-dark");
    }

    documentsBtn.addEventListener("click", function () {
        removeActive();
        documentsBtn.classList.add("active");
        hideAllPages();
        masterclass.style.display = "block";
        floating.style.display = "none";
    });

    profileBtn.addEventListener("click", function () {
        removeActive();
        profileBtn.classList.add("active");
        hideAllPages();
        profilePage.style.display = "block";
        floating.style.display = "none";
    });

    homeBtn.addEventListener("click", function () {
        removeActive();
        homeBtn.classList.add("active");
        hideAllPages();
        dashboard.style.display = "block";
        floating.style.display = "flex";
    });

    aiBtn.addEventListener("click", function () {
        removeActive();
        aiBtn.classList.add("active");
        hideAllPages();
        aiPage.style.display = "flex";
        document.body.classList.add("ai-dark");
        floating.style.display = "none";
    });

    homeBtn.classList.add("active");


    /* -----------------------------
       MASTERCLASS MODAL SYSTEM
    ------------------------------ */

    const courseCards = document.querySelectorAll(".mc-course-card");
    const modal = document.getElementById("mcModal");

    const modalTitle = document.getElementById("modalTitle");
    const modalInstructor = document.getElementById("modalInstructor");
    const modalLevel = document.getElementById("modalLevel");
    const modalDescription = document.getElementById("modalDescription");

    const closeBtn = document.getElementById("mcModalClose");
    const overlay = document.getElementById("mcModalOverlay");

    courseCards.forEach(card => {
        card.addEventListener("click", () => {

            modalTitle.textContent = card.dataset.title;
            modalInstructor.textContent = "with " + card.dataset.instructor;
            modalLevel.textContent = card.dataset.level;
            modalDescription.textContent = card.dataset.description;

            modal.classList.add("active");
            document.body.classList.add("modal-open");
        });
    });

    function closeModal() {
        modal.classList.remove("active");
        document.body.classList.remove("modal-open");
    }

    closeBtn.addEventListener("click", closeModal);
    overlay.addEventListener("click", closeModal);

});
