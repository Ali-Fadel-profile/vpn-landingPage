// control the header visiabilty 
window.addEventListener('scroll', function () {
  const header = document.querySelector('.header');
  const firstSection = document.querySelector('.about');
  
  const sectionTop = firstSection.getBoundingClientRect().top;
  const sectionBottom = firstSection.getBoundingClientRect().bottom;

  if (sectionBottom <= 0) {
    header.classList.add('header__scrolled');
    header.classList.remove('header--hidden');

  } else if (sectionTop < 0) {
    header.classList.add('header--hidden');
    header.classList.remove('header__scrolled');

  } else {
    header.classList.remove('header--hidden');
    header.classList.remove('header__scrolled');
  }
});


const menuInput = document.querySelector(".menu__input"); 
const nav = document.querySelector(".header__nav"); 
const navLinks = document.querySelectorAll(".nav__item a"); 

// Function to toggle nav visibility
const toggleNav = () => {
    if (menuInput.checked) {
        nav.classList.add("nav__popUp"); 
        console.log("input clicked");
    } else {
        nav.classList.remove("nav__popUp"); 
    }
};
menuInput.addEventListener("click", toggleNav);

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("nav__popUp");  
            menuInput.checked = false; 
    })
})

// statistics numbers animation 
document.addEventListener("DOMContentLoaded", function () {
  const counters = document.querySelectorAll(".statistics__number");

  // Function to animate count-up effect
  const animateCounter = (counter) => {
    const target = +counter.getAttribute("data-target");
    const increment = target / 100; 

    let count = 0;

    const updateCounter = () => {
      if (count < target) {
        count += increment;
        counter.textContent = Math.ceil(count) + "+"; 
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target + "+"; 
      }
    };

    updateCounter();
  };

  // Observer to detect when the section is in view
  const options = { threshold: 0.5 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        counters.forEach((counter) => {
          counter.setAttribute("data-target", counter.textContent.slice(0, -1));
          animateCounter(counter);
        });
        observer.unobserve(entry.target); 
      }
    });
  }, options);

  // Observe the section
  const statisticsSection = document.querySelector(".statistics");
  if (statisticsSection) observer.observe(statisticsSection);
});

// js code for carousal control
const carousel = document.querySelector('.testimonials__carousel');
const btnLeft = document.querySelector('.carousel__nav-button--left');
const btnRight = document.querySelector('.carousel__nav-button--right');

const scrollAmount = 400;
btnLeft.addEventListener('click', () => {
    carousel.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth',
    });
  });

  btnRight.addEventListener('click', () => {
    carousel.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  });

  // change the indicators color when the user change the visibla card
  const indicators = document.querySelectorAll('.indicator');
  const cards = document.querySelectorAll('.carousel__card');
  const activeColor = '#f53855'; 
  const inactiveColor = '#4f55644d'; 
  
  function updateIndicators() {
    const cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(carousel).gap); 
    const scrollLeft = carousel.scrollLeft;
    const currentIndex = Math.round(scrollLeft / cardWidth);
  
    indicators.forEach((indicator, index) => {
      indicator.style.backgroundColor = index === currentIndex ? activeColor : inactiveColor;
    });
  }
  updateIndicators();
carousel.addEventListener('scroll', updateIndicators);
 