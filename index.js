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

    /* PAGE SWITCHING SYSTEM */

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
    /* MASTERCLASS MODAL SYSTEM */
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

    /* HERO VIEW CURRICULUM BUTTON */
const heroCurriculumBtn = document.getElementById("heroCurriculumBtn");

if (heroCurriculumBtn) {
    heroCurriculumBtn.addEventListener("click", () => {
        modalTitle.textContent = "Mastering Global Venture Capital";
        modalInstructor.textContent = "with Sarah Jenkins";
        modalLevel.textContent = "BEGINNER";
        modalDescription.textContent =
            "Join the Founder of Sequoia & OhhIdeaX as they break down the secrets of raising your first $10M in the current market.";

        modal.classList.add("active");
        document.body.classList.add("modal-open");
    });
}
    /* =========================
       AI CHAT SYSTEM
    ========================== */
    const textarea = document.querySelector(".ai-textarea");
    const sendBtn = document.querySelector(".send-btn");
    const chatMessages = document.getElementById("chatMessages");

  async function sendMessageToAI(message) {
    return "AI is currently offline.";
}
    async function handleSend() {

        const userMessage = textarea.value.trim();
        if (!userMessage) return;
        textarea.value = "";
        // USER BUBBLE
        const userBubble = document.createElement("div");
        userBubble.className = "chat-bubble chat-user";
        userBubble.textContent = userMessage;
        chatMessages.appendChild(userBubble);

        // AI TYPING BUBBLE
        const aiBubble = document.createElement("div");
        aiBubble.className = "chat-bubble chat-ai";
        aiBubble.textContent = "Thinking...";
        chatMessages.appendChild(aiBubble);

        chatMessages.scrollTop = chatMessages.scrollHeight;

        try {
            const aiReply = await sendMessageToAI(userMessage);
            aiBubble.textContent = aiReply;
        } catch (error) {
            aiBubble.textContent = "Error connecting to AI.";
        }

        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    sendBtn.addEventListener("click", handleSend);

    textarea.addEventListener("keydown", function (e) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    });

});