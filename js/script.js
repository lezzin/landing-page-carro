const anchorLinks = document.querySelectorAll('a[href^="#"]');
const slides = document.querySelectorAll('#slider > div');
const nextButton = document.querySelector('#next-slide');
const prevButton = document.querySelector('#prev-slide');
const mobileNavigation = document.querySelector('#mobile-navigation');
const mobileNavigationOpener = document.querySelector('#mobile-navigation-opener');
const mobileNavigationCloser = document.querySelector('#mobile-navigation-closer');
const parallaxImages = document.querySelectorAll('[data-parallax]');

const TOTAL_SLIDES = slides.length;
const PARALLAX_SPEED = 0.5;

let currentIndex = 0;
let sliderInterval = null;

const updateSlideVisibility = (index) => {
    slides.forEach((slide, i) => {
        const isActive = i === index;
        slide.style.opacity = isActive ? '1' : '0';
        slide.classList.toggle('opacity-100', isActive);
        slide.classList.toggle('opacity-0', !isActive);
    });
};

const startSliderInterval = () => {
    if (sliderInterval) clearInterval(sliderInterval);
    sliderInterval = setInterval(() => changeSlide(1), 5000);
};

const changeSlide = (increment) => {
    currentIndex = (currentIndex + increment + TOTAL_SLIDES) % TOTAL_SLIDES;
    updateSlideVisibility(currentIndex);
    startSliderInterval();
};

const toggleMobileNavigation = (isOpen) => {
    mobileNavigation.classList.toggle('hidden', !isOpen);
};

const applyParallaxEffect = () => {
    const scrollPosition = window.scrollY;
    parallaxImages.forEach(image => {
        const translateY = scrollPosition * PARALLAX_SPEED;
        image.style.transform = `translate3d(0, ${translateY}px, 0)`;
    });
};

const scrollPageCorrectly = (anchor) => {
    const targetId = anchor.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth',
        });
    }
};

anchorLinks.forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        scrollPageCorrectly(anchor);
    });
});

mobileNavigationOpener.addEventListener('click', () => toggleMobileNavigation(true));
mobileNavigationCloser.addEventListener('click', () => toggleMobileNavigation(false));
nextButton.addEventListener('click', () => changeSlide(1));
prevButton.addEventListener('click', () => changeSlide(-1));

document.addEventListener('scroll', applyParallaxEffect);

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) toggleMobileNavigation(false);
});

updateSlideVisibility(currentIndex);
startSliderInterval();
applyParallaxEffect();

AOS.init({
    duration: 1000,
    offset: 50,
});