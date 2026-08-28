/* ==========================================================================
   SELVAM PORTFOLIO - MAIN SCRIPT
   Clean, Consolidated JavaScript Logic with Live Backend API Support
   ========================================================================== */

// 1. MOBILE NAVIGATION MENU TOGGLE
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("active");
    });

    // Close mobile nav drawer when clicking any link
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
      });
    });
  }

  // 2. THEME TOGGLE (DARK / LIGHT MODE)
  const toggleBtn = document.getElementById("themeToggle");
  const body = document.body;

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      body.classList.toggle("light");
      if (body.classList.contains("light")) {
        toggleBtn.innerHTML = "🌙";
      } else {
        toggleBtn.innerHTML = "🌞";
      }
    });
  }

  // 3. BACK TO TOP BUTTON
  const topBtn = document.getElementById("topBtn");
  if (topBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        topBtn.style.display = "block";
      } else {
        topBtn.style.display = "none";
      }
    });

    topBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});

// 4. CONTACT FORM SUBMISSION
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const nameInput = document.querySelector("input[name='name']");
    const emailInput = document.querySelector("input[name='email']");
    const messageInput = document.querySelector("textarea[name='message']");

    const name = nameInput ? nameInput.value.trim() : "";
    const email = emailInput ? emailInput.value.trim() : "";
    const message = messageInput ? messageInput.value.trim() : "";

    const successMsg = document.getElementById("successMessage");

    // Dynamic backend endpoint (Local server or Cloud MongoDB API)
    const API_ENDPOINT = (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
      ? "http://localhost:5000/api/contact"
      : "https://selvam-portfolio-backend.onrender.com/api/contact";

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, message })
      });

      if (response.ok) {
        if (successMsg) {
          successMsg.style.display = "block";
          setTimeout(() => {
            successMsg.style.display = "none";
          }, 3500);
        }
        contactForm.reset();
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      if (successMsg) {
        successMsg.style.display = "block";
        setTimeout(() => {
          successMsg.style.display = "none";
        }, 3500);
      }
      contactForm.reset();
    }
  });
}

// 5. CERTIFICATE MODAL PREVIEW
function openCertificate(file) {
  const modal = document.getElementById("certificateModal");
  const img = document.getElementById("certificateImage");
  const pdf = document.getElementById("certificatePDF");

  if (!modal || !img || !pdf) return;

  modal.style.display = "flex";

  if (file.endsWith(".pdf")) {
    pdf.src = file;
    pdf.style.display = "block";
    img.style.display = "none";
  } else {
    img.src = file;
    img.style.display = "block";
    pdf.style.display = "none";
  }
}

function closeCertificate() {
  const modal = document.getElementById("certificateModal");
  const img = document.getElementById("certificateImage");
  const pdf = document.getElementById("certificatePDF");

  if (!modal) return;

  modal.style.display = "none";
  if (img) img.src = "";
  if (pdf) pdf.src = "";
}

/* Close certificate modal on ESC key */
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeCertificate();
  }
});

/* Close certificate modal when clicking outside background */
const certModal = document.getElementById("certificateModal");
if (certModal) {
  certModal.addEventListener("click", function (e) {
    if (e.target === certModal) {
      closeCertificate();
    }
  });
}

// 6. HERO TYPING EFFECT
const words = [
  "Creative Web Developer",
  "Frontend Developer",
  "JavaScript Developer",
  "Full Stack Developer"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const typing = document.getElementById("typing");
  if (!typing) return;

  const currentWord = words[wordIndex];

  if (!isDeleting) {
    charIndex++;
    typing.textContent = currentWord.substring(0, charIndex);
  } else {
    charIndex--;
    typing.textContent = currentWord.substring(0, charIndex);
  }

  let speed = 80;

  if (!isDeleting && charIndex === currentWord.length) {
    speed = 1500;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
  }

  setTimeout(typeEffect, speed);
}

// Start typing effect on load
typeEffect();