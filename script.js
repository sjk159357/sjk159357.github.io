document.documentElement.classList.add("js-enabled");

const yearElement = document.querySelector("#year");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const revealItems = document.querySelectorAll(".reveal");
const revealEmailButton = document.querySelector("#reveal-email-button");
const copyEmailButton = document.querySelector("#copy-email-button");
const emailStatus = document.querySelector("#email-status");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const emailCodes = [120, 115, 101, 53, 53, 57, 52, 64, 103, 109, 97, 105, 108, 46, 99, 111, 109];
const protectedEmail = String.fromCharCode(...emailCodes);

if (revealEmailButton && emailStatus) {
  revealEmailButton.addEventListener("click", () => {
    emailStatus.textContent = `Founder contact: ${protectedEmail}`;
    revealEmailButton.textContent = "Email Revealed";
  });
}

if (copyEmailButton && emailStatus && navigator.clipboard) {
  copyEmailButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(protectedEmail);
      emailStatus.textContent = `Email copied: ${protectedEmail}`;
    } catch {
      emailStatus.textContent = "Copy failed. Use the reveal button instead.";
    }
  });
}

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    {
      threshold: 0.18,
    },
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
