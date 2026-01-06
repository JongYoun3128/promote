// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = "rgba(26, 26, 26, 0.98)";
    } else {
        navbar.style.backgroundColor = "#1a1a1a";
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

// Signature Dishes - Auto Slideshow with Impact
let currentDishSlide = 0;
const dishSlides = document.querySelectorAll(".dish-slide");
const dishIndicators = document.querySelectorAll(
    ".dishes-indicators .indicator"
);
const totalDishSlides = dishSlides.length;
let dishSlideInterval;

function showDishSlide(index) {
    if (dishSlides.length === 0) return;

    // Add exiting class to current active slide
    const currentActive = document.querySelector(".dish-slide.active");
    if (currentActive) {
        currentActive.classList.add("exiting");
        setTimeout(() => {
            currentActive.classList.remove("exiting");
        }, 1000);
    }

    // Remove active class from all slides and indicators
    dishSlides.forEach((slide) => slide.classList.remove("active"));
    dishIndicators.forEach((indicator) => indicator.classList.remove("active"));

    // Add active class to selected slide and indicator
    dishSlides[index].classList.add("active");
    if (dishIndicators[index]) {
        dishIndicators[index].classList.add("active");
    }

    currentDishSlide = index;
}

function showNextDishSlide() {
    const nextSlide = (currentDishSlide + 1) % totalDishSlides;
    showDishSlide(nextSlide);
}

// Start dish slideshow
if (dishSlides.length > 0) {
    // Set first slide as active
    showDishSlide(0);

    // Change slide every 4 seconds
    dishSlideInterval = setInterval(showNextDishSlide, 4000);

    // Add click event to indicators
    dishIndicators.forEach((indicator, index) => {
        indicator.addEventListener("click", () => {
            clearInterval(dishSlideInterval);
            showDishSlide(index);
            // Restart auto-play
            dishSlideInterval = setInterval(showNextDishSlide, 4000);
        });
    });
}

// Marketing Section - Auto Slideshow
let currentSlide = 0;
const slides = document.querySelectorAll(".marketing-item");
const totalSlides = slides.length;

function showNextSlide() {
    if (slides.length === 0) return;

    // Remove active class from current slide
    slides[currentSlide].classList.remove("active");

    // Move to next slide
    currentSlide = (currentSlide + 1) % totalSlides;

    // Add active class to new slide
    slides[currentSlide].classList.add("active");
}

// Start slideshow if slides exist
if (slides.length > 0) {
    // Set first slide as active
    slides[0].classList.add("active");

    // Change slide every 3 seconds
    setInterval(showNextSlide, 1000);
}

// Observe sections
document.querySelectorAll(".about, .menu, .marketing").forEach((section) => {
    const content = section.querySelector(
        ".about-content, .menu-content, .marketing-content"
    );
    if (content) {
        content.style.opacity = "0";
        content.style.transform = "translateY(30px)";
        content.style.transition =
            "opacity 0.8s ease-out, transform 0.8s ease-out";
        observer.observe(content);
    }
});

// Parallax effect for hero section
window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector(".hero");
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add loading animation
window.addEventListener("load", function () {
    document.body.style.opacity = "0";
    setTimeout(() => {
        document.body.style.transition = "opacity 0.5s";
        document.body.style.opacity = "1";
    }, 100);
});

// Gallery infinite scroll - ensure smooth loop
const galleryTrack = document.querySelector(".gallery-track");
if (galleryTrack) {
    // Add touch/drag support for mobile
    let startX;
    let scrollLeft;
    let isDown = false;

    galleryTrack.addEventListener("mousedown", (e) => {
        isDown = true;
        startX = e.pageX - galleryTrack.offsetLeft;
        scrollLeft = galleryTrack.scrollLeft;
        galleryTrack.style.animationPlayState = "paused";
    });

    galleryTrack.addEventListener("mouseleave", () => {
        isDown = false;
        galleryTrack.style.animationPlayState = "running";
    });

    galleryTrack.addEventListener("mouseup", () => {
        isDown = false;
        galleryTrack.style.animationPlayState = "running";
    });

    galleryTrack.addEventListener("touchstart", () => {
        galleryTrack.style.animationPlayState = "paused";
    });

    galleryTrack.addEventListener("touchend", () => {
        galleryTrack.style.animationPlayState = "running";
    });
}
