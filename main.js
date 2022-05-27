(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function (e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Hero carousel indicators
   */
  let heroCarouselIndicators = select("#hero-carousel-indicators")
  let heroCarouselItems = select('#heroCarousel .carousel-item', true)

  heroCarouselItems.forEach((item, index) => {
    (index === 0) ?
    heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "' class='active'></li>":
      heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "'></li>"
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function (e) {
        e.preventDefault();
        portfolioFilters.forEach(function (el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function () {
          AOS.refresh()
        });
      }, true);
    }

  });


  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });


})()

//******************  Registration Page ************************//
/*** Registration Page (upload image) ***/
const image_input = document.querySelector("#image_input");
var uploaded_image = "";
image_input.addEventListener("change", function () {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    uploaded_image = reader.result;
    document.querySelector("#display_image").style.backgroundImage = `url(${uploaded_image})`;
  });
  reader.readAsDataURL(this.files[0]);
});

/*** Registration Page (FirstName Validation) ***/
function firstNameValidation() {
  let firstNameInput = document.getElementById('firstNameInput');
  let firstNameError = document.getElementById('firstNameError');
  let x = document.getElementById('firstNameInput');
  x.value = x.value.toUpperCase();

  if (firstNameInput.value == '') {
    firstNameInput.style.borderColor = 'red';
    firstNameError.innerHTML = 'Please Enter First Name';
  } else if (firstNameInput.value.includes('0 - 1')) {
    firstNameInput.style.borderColor = 'red';
    firstNameError.innerHTML = 'Invalid Email';
  } else {
    firstNameInput.style.borderColor = 'blue';
    firstNameError.innerHTML = '';
  }
}

/*** Registration Page (LastName Validation) ***/
function lastNameValidation() {
  let lastNameInput = document.getElementById('lastNameInput');
  let lastNameError = document.getElementById('lastNameError');
  let x = document.getElementById('lastNameInput');
  x.value = x.value.toUpperCase();

  if (lastNameInput.value == '') {
    lastNameInput.style.borderColor = 'red';
    lastNameError.innerHTML = 'Please Enter Last Name';
  } else if (lastNameInput.value.includes('0 - 1')) {
    lastNameInput.style.borderColor = 'red';
    lastNameError.innerHTML = 'Invalid Email';
  } else {
    lastNameInput.style.borderColor = 'blue';
    lastNameError.innerHTML = '';
  }
}

/*** Registration Page (Email Validation) ***/
function emailInputValidation() {
  let emailInput = document.getElementById('emailInput');
  let emailError = document.getElementById('emailError');
  let x = document.getElementById('emailInput');
  x.value = x.value.toLowerCase();

  if (emailInput.value == '') {
    emailInput.style.borderColor = 'red';
    emailError.innerHTML = 'Please Enter an Email';
  } else if (!emailInput.value.includes('@')) {
    emailInput.style.borderColor = 'red';
    emailError.innerHTML = 'Invalid Email';
  } else {
    emailInput.style.borderColor = 'blue';
    emailError.innerHTML = '';
  }
}

/*** Registration Page (Phone Number Validation) ***/
function phoneInputValidation() {
  let phoneInput = document.getElementById('phoneInput');
  let phoneInputError = document.getElementById('phoneInputError');

  if (phoneInput.value == '') {
    phoneInput.style.borderColor = 'red';
    phoneInputError.innerHTML = 'Please Enter Your PhoneNumber';
  } else {
    phoneInput.style.borderColor = 'blue';
    phoneInputError.innerHTML = '';
  }
}
//** (Is Input a Number Validation) **/
function isInputNumber() {
  let char = string.fromCharCode(evt.which);
  if (!(/[0 - 9]/.test(char))) {
    evt.preventDefault();
  }
}

/*** Contact Page (Name Validation) ***/