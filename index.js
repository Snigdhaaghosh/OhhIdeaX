document.addEventListener("DOMContentLoaded", function () {

    const dashboard = document.getElementById("dashboardPage");
    const masterclass = document.getElementById("masterclassPage");
    const profileBtn = document.getElementById("userProfileBtn");
    const profilePage = document.getElementById("profilePage");
    const documentsBtn = document.getElementById("documentsNavBtn");
    const homeBtn = document.getElementById("homeNavBtn");
    const floating = document.getElementById("floatingElements");
    const navItems = document.querySelectorAll(".nav-item");

    function removeActive() {
    navItems.forEach(item => item.classList.remove("active"));
    profileBtn.classList.remove("active");
}

    // ===== SHOW MASTERCLASS =====
    documentsBtn.addEventListener("click", function () {
        removeActive();
        documentsBtn.classList.add("active");

        dashboard.style.display = "none";
        masterclass.style.display = "block";
        profilePage.style.display = "none";
        floating.style.display = "none";
    });
    
    // ===== SHOW PROFILE =====
    profileBtn.addEventListener("click", function () {
    removeActive();
    profileBtn.classList.add("active");

    dashboard.style.display = "none";
    masterclass.style.display = "none";
    profilePage.style.display = "block";
    floating.style.display = "none";
});

    // ===== SHOW DASHBOARD =====
    homeBtn.addEventListener("click", function () {
        removeActive();
        homeBtn.classList.add("active");
        dashboard.style.display = "block";
        masterclass.style.display = "none";
        profilePage.style.display = "none";
        floating.style.display = "flex";
    });

    // Default load = Home active
    homeBtn.classList.add("active");
});
