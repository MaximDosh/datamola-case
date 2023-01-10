const navToggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".links");
const modalBtn = document.querySelector(".modal-btn");
const modal = document.querySelector(".modal-overlay");
const modalContainer = document.querySelector(".modal-container");
const closeBtn = document.querySelector(".close-btn");
const slides = document.querySelectorAll(".slide");
const nextBtn = document.querySelector(".nextBtn");
const prevBtn = document.querySelector(".prevBtn");
const animItems = document.querySelectorAll(".animation");

let counter = 0;

navToggle.addEventListener("click", function () {
  links.classList.toggle("show-links");
});

modalBtn.addEventListener("click", function () {
  modal.classList.add("open-modal");
  modalContainer.classList.add("open-container");
});

closeBtn.addEventListener("click", function () {
  modal.classList.remove("open-modal");
  modalContainer.classList.remove("open-container");
});

slides.forEach(function (slide, index) {
  slide.style.left = `${index * 100}%`;
});
prevBtn.style.display = "none";

nextBtn.addEventListener("click", function () {
  counter++;
  carusel();
});

prevBtn.addEventListener("click", function () {
  counter--;
  carusel();
});

const carusel = () => {
  if (counter < 0) {
    counter = 0;
  }
  if (counter < slides.length - 1) {
    nextBtn.style.display = "block";
  } else {
    nextBtn.style.display = "none";
  }
  if (counter > 0) {
    prevBtn.style.display = "block";
  } else {
    prevBtn.style.display = "none";
  }

  slides.forEach(function (slide) {
    slide.style.transform = `translateX(-${counter * 100}%)`;
  });
};

const backToTop = () => {
  const button = document.querySelector(".back-to-top");

  button.style.display = "none";

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    scrollY > 500 ? (button.style.display = "block") : (button.style.display = "none");
  });
};

backToTop();

if (animItems.length > 0) {
  window.addEventListener("scroll", animOnScroll);
  function animOnScroll() {
    for (let i = 0; i < animItems.length; i++) {
      const animItem = animItems[i];
      const animItemHeight = animItem.offsetHeight;
      const animItemOffset = offset(animItem).top;
      const animStart = 4;

      let animItemPoint = window.innerHeight - animItemHeight / animStart;
      if (animItemHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }

      if (
        pageYOffset > animItemOffset - animItemPoint &&
        pageYOffset < animItemOffset + animItemHeight
      ) {
        animItem.classList.add("animation-scroll");
      }
    }
  }
  function offset(el) {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageYOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  }
}
