function greeting() {
  const hour = new Date().getHours();

  if (hour > 3 && hour <= 10) {
    return "Halo, selamat pagi kak";
  } else if (hour > 10 && hour <= 15) {
    return "Halo, selamat siang kak";
  } else if (hour > 15 && hour <= 18) {
    return "Halo, selamat sore kak";
  } else {
    return "Halo, selamat malam kak";
  }
}

function formatDateTime(date, time) {
  return moment(`${date} ${time}`).locale("id").format("lll");
}

function handleFormBooking(e) {
  e.preventDefault();

  const location = this.querySelector('[name="location"]').value;
  const date = this.querySelector('[name="date"]').value;
  const time = this.querySelector('[name="time"]').value;
  const car = this.querySelector('[name="car"]').value;
  const message = `${greeting()}. Saya ingin memesan mobil ${car} pada ${formatDateTime(
    date,
    time
  )} dilokasi ${location}, apakah mobil tersedia?`;

  window.open(
    `https://api.whatsapp.com/send/?phone=1234567890&text=${encodeURI(
      message
    )}`,
    "_blank"
  );
}

function handleCheckCarAvailability(e) {
  const car = this.getAttribute("data-car");
  const message = `${greeting()}. Saya ingin menanyakan, apakah mobil ${car} tersedia untuk dirental?`;

  window.open(
    `https://api.whatsapp.com/send/?phone=1234567890&text=${encodeURI(
      message
    )}`,
    "_blank"
  );
}

function handleFormContactUs(e) {
  e.preventDefault();

  const firstName = this.querySelector('input[name="first-name"]').value;
  const lastName = this.querySelector('input[name="last-name"]').value;
  const email = this.querySelector('input[name="email"]').value;
  const phoneNumber = this.querySelector('input[name="phone-number"]').value;
  const message = this.querySelector('textarea[name="message"]').value.trim();

  const finalMessage = [
    `Nama: ${firstName} ${lastName}`,
    `Email: ${email}`,
    `Nomor Telepon: ${phoneNumber}`,
    `Pesan: ${message}`
  ].join('\n');

  window.open(
    `https://api.whatsapp.com/send/?phone=1234567890&text=${encodeURIComponent(finalMessage)}`,
    "_blank"
  );
}

function resetTextAreaValidation(e) {
  this.setCustomValidity("");
}

function validatePhoneNumber(e) {
  this.value = this.value.replace(/\D/g, ""); // Remove all non-numeric characters

  if (this.value && this.value.length >= 2 && !["62", "08"].includes(this.value.substring(0, 2))) {
    this.setCustomValidity("Invalid phone number.");
    this.reportValidity();
  } else {
    this.setCustomValidity("");
    this.reportValidity();
  }
}

function handleOpenMobileMenu(e) {
  const menuButton = document.querySelector(".flex.md\\:hidden button");
  const mobileMenu = document.getElementById("mobileMenu");
  const backdrop = mobileMenu.querySelector(".backdrop");

  menuButton.addEventListener("click", function () {
    mobileMenu.classList.remove("translate-x-full", "opacity-0");
    mobileMenu.classList.add("translate-x-0", "opacity-100");

    // Setting backdrop
    setTimeout(() => {
      backdrop.classList.add("bg-black", "opacity-50");
    }, 500);
  });
}

function handleCloseMobileMenu(e) {
  const mobileMenu = document.getElementById("mobileMenu");
  const backdrop = mobileMenu.querySelector(".backdrop");

  mobileMenu.classList.remove("translate-x-0", "opacity-100");
  mobileMenu.classList.add("translate-x-full");
  backdrop.classList.remove("bg-black", "opacity-50");

  // Ensures menu stays visible while animating, then hides after animation
  setTimeout(() => {
    //   mobileMenu.style.display = "none";
    mobileMenu.classList.add("opacity-0");
  }, 500); // Matches the Tailwind transition duration (500ms)
}

function initCarsAnimationOnEntry() {
  const carGrid = document.getElementById("car-grid");
  const carCards = document.querySelectorAll(".car-card");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          carGrid.classList.remove("opacity-0");

          carCards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.remove("opacity-0", "translate-y-10", "scale-90");
              card.classList.add("scale-100");
            }, index * 200); // Stagger effect with 200ms delay per card
          });

          observer.unobserve(carGrid); // Stop observing after animation
        }
      });
    },
    { threshold: 0.3 }
  ); // Trigger when 30% of the section is visible

  observer.observe(carGrid);
}

function initTestimoniAnimation() {
  gsap.from("#testimoni .testimonial-item", {
    opacity: 0,
    y: 50,
    stagger: 0.2, // Delay between each testimonial
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#testimoni",
      start: "top 80%", // When 80% of the section is visible
      toggleActions: "play none none none",
      once: true, // Ensures it only plays once
    },
  });

  // Animate stars appearing one by one
  gsap.from("#testimoni .overall-stars svg", {
    opacity: 0,
    y: 20, // Move stars up
    scale: 0.5, // Start small
    stagger: 0.15, // Delay between each star
    duration: 0.6,
    ease: "back.out(1.7)",
    scrollTrigger: {
      trigger: ".overall-stars",
      start: "top 85%", // Start when 85% of viewport
      toggleActions: "play none none none",
      once: true,
    },
  });

  // Animate progress bars filling up
  gsap.fromTo(
    "#testimoni .progress-bar-fill",
    { width: "0%" }, // Start from 0%
    {
      width: (i, el) => el.getAttribute("data-width"), // Get actual width from attribute
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".progress-bar",
        start: "top 90%",
        toggleActions: "play none none none",
        once: true,
      },
    }
  );
}

function initContactUsAnimation() {
  gsap.from("#contact h2, #contact h3", {
    opacity: 0,
    y: -50,
    duration: 1,
    ease: "power2.out",
    stagger: 0.3,
    scrollTrigger: {
      trigger: "#contact",
      start: "top 80%",
    },
  });

  gsap.from("#contact p, #contact dl div", {
    opacity: 0,
    x: -40,
    duration: 1,
    ease: "power2.out",
    stagger: 0.2,
    scrollTrigger: {
      trigger: "#contact",
      start: "top 85%",
    },
  });

  gsap.from("#formContactUs", {
    opacity: 0,
    x: 40,
    duration: 1.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#formContactUs",
      start: "top 85%",
    },
  });

  gsap.from("#formContactUs button", {
    opacity: 0,
    scale: 0.9,
    duration: 0.8,
    ease: "back.out(1.7)",
    scrollTrigger: {
      trigger: "button",
      start: "top 90%",
    },
  });
}

document.addEventListener("DOMContentLoaded", (e) => {
  document
    .querySelector("#hero #formBooking")
    .addEventListener("submit", handleFormBooking);

  document.querySelectorAll("#cars .check-car-availability").forEach((el) => {
    el.addEventListener("click", handleCheckCarAvailability);
  });

  document
    .querySelector("#contact #formContactUs")
    .addEventListener("submit", handleFormContactUs);

  document
    .querySelector('#contact #formContactUs [name="message"]')
    .addEventListener("input", resetTextAreaValidation);

  document
    .querySelector('#contact #formContactUs input[name="phone-number"]')
    .addEventListener("input", validatePhoneNumber);

  const menuButton = document.querySelector(".flex.md\\:hidden button");
  const closeButton = mobileMenu.querySelector("#mobileMenu button");

  menuButton.addEventListener("click", handleOpenMobileMenu);
  closeButton.addEventListener("click", handleCloseMobileMenu);

  initCarsAnimationOnEntry();

  gsap.registerPlugin(ScrollTrigger);

  initTestimoniAnimation();
  initContactUsAnimation();
});
