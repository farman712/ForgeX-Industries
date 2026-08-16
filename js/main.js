/* =========================================
   FORGEX INDUSTRIES
   MAIN JAVASCRIPT
========================================= */


/* =========================================
   MOBILE MENU
========================================= */

// Mobile menu button ko select karna
const menuToggle = document.querySelector(".menu-toggle");

// Navigation menu ko select karna
const navMenu = document.querySelector(".nav-menu");


// Button par click hone par menu open/close hoga
menuToggle.addEventListener("click", function () {

    navMenu.classList.toggle("active");

});


/* =========================================
   CLOSE MENU AFTER CLICKING LINK
========================================= */

// Navigation ke saare links select karna
const navLinks = document.querySelectorAll(".nav-menu a");


// Har link ke liye click event
navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navMenu.classList.remove("active");

    });

});


/* =========================================
   NAVBAR SCROLL EFFECT
========================================= */

const navbar = document.querySelector(".navbar");


window.addEventListener("scroll", function () {

    if (window.scrollY > 50) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});


/* =========================================
   CONTACT FORM
========================================= */

const contactForm = document.querySelector(".contact-form");


contactForm.addEventListener("submit", function (event) {

    // Page reload hone se rokna
    event.preventDefault();

    // Temporary message
    alert(
        "Thank you for your enquiry. Our engineering team will contact you shortly."
    );

    // Form clear karna
    contactForm.reset();

});