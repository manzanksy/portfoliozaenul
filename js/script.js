// Mobile Navigation Toggle
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");
const headerEl = document.getElementById("header");

function updateMobileMenuTop() {
  if (headerEl && navLinks) {
    navLinks.style.top = headerEl.offsetHeight + "px";
  }
}
// set initial top and update on resize
updateMobileMenuTop();
window.addEventListener("resize", updateMobileMenuTop);

hamburger.addEventListener("click", () => {
  // recalc before toggling to avoid overlap with header
  updateMobileMenuTop();
  navLinks.classList.toggle("active");
  hamburger.innerHTML = navLinks.classList.contains("active")
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.getElementById("header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Animate skill bars on scroll - FIXED
const animateSkillBars = () => {
  const skillBars = document.querySelectorAll(".skill-progress");
  skillBars.forEach((bar) => {
    const barPosition = bar.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (barPosition < screenPosition) {
      const width = bar.getAttribute("data-width");
      // Set width dengan animasi
      bar.style.width = width + "%";
    }
  });
};

// Typewriter animation removed (static name text used instead)
// function loopTypeWriterEffect() { /* removed */ // }

// Awards Hover Effect
function initAwardsHover() {
  const awardCards = document.querySelectorAll(".award-card");

  // Tambahkan event listener untuk setiap card award
  awardCards.forEach((card) => {
    // Efek saat mouse masuk
    card.addEventListener("mouseenter", function () {
      // Tambahkan efek visual tambahan
      this.style.transform = "translateY(-10px) scale(1.02)";
      this.style.boxShadow = "0 25px 50px rgba(0, 0, 0, 0.2)";
    });

    // Efek saat mouse keluar
    card.addEventListener("mouseleave", function () {
      // Kembalikan ke posisi semula
      this.style.transform = "translateY(0) scale(1)";
      this.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.05)";
    });
  });
}

// Hobbies Hover Effect - SAMA SEPERTI AWARDS
function initHobbiesHover() {
  const hobbyCards = document.querySelectorAll(".hobby-card");

  // Tambahkan event listener untuk setiap card hobby
  hobbyCards.forEach((card) => {
    // Efek saat mouse masuk
    card.addEventListener("mouseenter", function () {
      // Tambahkan efek visual tambahan
      this.style.transform = "translateY(-10px) scale(1.02)";
      this.style.boxShadow = "0 25px 50px rgba(0, 0, 0, 0.2)";
    });

    // Efek saat mouse keluar
    card.addEventListener("mouseleave", function () {
      // Kembalikan ke posisi semula
      this.style.transform = "translateY(0) scale(1)";
      this.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.05)";
    });
  });
}

// Certificate modal: show certificate image when award card is clicked
function initCertificateModal() {
  const modal = document.querySelector(".certificate-modal");
  if (!modal) return;
  const overlay = modal.querySelector(".certificate-modal__overlay");
  const closeBtn = modal.querySelector(".certificate-modal__close");
  const modalImg = modal.querySelector(".certificate-modal__img");

  function openModal(imgSrc, imgAlt) {
    modalImg.src = imgSrc || "";
    modalImg.alt = imgAlt || "";
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    modalImg.src = "";
    modalImg.alt = "";
  }

  // Click any award card to open modal (use its image)
  document.querySelectorAll(".award-card").forEach((card) => {
    card.addEventListener("click", function (e) {
      // ignore clicks on close button if any
      const img = this.querySelector(".award-image img");
      if (!img) return;
      openModal(img.src, img.alt || "Sertifikat");
    });
  });

  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}

// Form submission
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  // Simple validation
  if (name && email && subject && message) {
    // In a real application, you would send this data to a server
    // For now, we'll just show an alert
    alert(
      `Terima kasih ${name}! Pesan Anda telah berhasil dikirim. Saya akan membalas pesan Anda ke ${email} segera.`
    );

    // Reset form
    this.reset();
  } else {
    alert("Silakan lengkapi semua bidang sebelum mengirim pesan.");
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// Highlight active navigation link on scroll
const sections = document.querySelectorAll("section");
const navLinksList = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (scrollY >= sectionTop - 150) {
      current = section.getAttribute("id");
    }
  });

  navLinksList.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Initialize everything when page loads
window.addEventListener("load", () => {
  // Animate skill bars on load
  animateSkillBars();

  // Typewriter effect removed

  // Initialize awards hover effect
  initAwardsHover();

  // Initialize hobbies hover effect
  initHobbiesHover();
  // Initialize certificate modal
  initCertificateModal();
  // Tambahkan event listener untuk scroll skill bars
  window.addEventListener("scroll", animateSkillBars);

  // Tambahkan class animasi untuk elemen lainnya
  document.querySelector(".hero-text p").classList.add("fade-in");
  document.querySelector(".hero-text .btn").classList.add("slide-up");
  document.querySelector(".profile-img").classList.add("fade-in");
});
