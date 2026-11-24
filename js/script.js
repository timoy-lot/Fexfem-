
document.addEventListener("DOMContentLoaded", () => {

  // 1. PAGE LOADER
  const loader = document.querySelector(".loader");

  if (loader) {
    window.addEventListener("load", () => {
      setTimeout(() => {
        loader.classList.add("hide");
      }, 700);
    });

    // Fallback if loading takes too long
    setTimeout(() => {
      loader.classList.add("hide");
    }, 4000);
  }

  // 2. MOBILE NAVIGATION
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      nav.classList.toggle("open");
      menuToggle.classList.toggle("active");

      const isOpen = nav.classList.contains("open");
      menuToggle.setAttribute("aria-expanded", isOpen);
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // 3. SCROLL REVEAL ANIMATIONS
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -35px 0px"
    });

    revealElements.forEach(element => {
      observer.observe(element);
    });
  } else {
    revealElements.forEach(element => {
      element.classList.add("visible");
    });
  }

  // 4. COLLECTION FILTERS
  const filterButtons = document.querySelectorAll(".filter");
  const catalogCards = document.querySelectorAll(".catalog-card");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {

      filterButtons.forEach(item => {
        item.classList.remove("active");
      });

      button.classList.add("active");

      const selectedCategory = button.dataset.filter;

      catalogCards.forEach(card => {
        const category = card.dataset.category;

        const shouldShow =
          selectedCategory === "all" ||
          category === selectedCategory;

        card.classList.toggle("hidden", !shouldShow);
      });
    });
  });

  // 5. ENQUIRY FORM
  const enquiryForm = document.querySelector("#enquiryForm");

  if (enquiryForm) {
    enquiryForm.addEventListener("submit", event => {
      event.preventDefault();

      const formMessage = enquiryForm.querySelector(".form-message");

      if (!enquiryForm.checkValidity()) {
        enquiryForm.reportValidity();
        return;
      }

      formMessage.textContent =
        "Thank you for your interest. This demo form is ready to be connected to your business email.";

      enquiryForm.reset();
    });
  }

  // 6. AUTOMATIC COPYRIGHT YEAR
  document.querySelectorAll(".year").forEach(element => {
    element.textContent = new Date().getFullYear();
  });

  // 7. IMAGE LOADING FALLBACK
  document.querySelectorAll("img").forEach(img => {
    img.addEventListener("error", () => {
      img.style.opacity = "0.25";
      img.alt = "Image currently unavailable";
    });
  });

});
