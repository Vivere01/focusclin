document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Toggle icon between bars and times (close)
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // --- Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            navbar.style.borderBottom = '1px solid rgba(212, 175, 55, 0.15)';
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.03)';
        } else {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.96)';
            navbar.style.borderBottom = '1px solid rgba(212, 175, 55, 0.08)';
            navbar.style.boxShadow = 'none';
        }
    });

    // --- Carousel Logic ---
    const slides = document.querySelectorAll('.carousel-slide');
    const btnPrev = document.querySelector('.carousel-button.prev');
    const btnNext = document.querySelector('.carousel-button.next');
    const indicators = document.querySelectorAll('.indicator');
    
    let currentSlide = 0;
    const maxSlide = slides.length - 1;
    let autoSlideInterval;

    const updateCarousel = () => {
        // Update slides
        slides.forEach((slide, index) => {
            slide.classList.remove('active');
            if (index === currentSlide) {
                slide.classList.add('active');
            }
        });

        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.remove('active');
            if (index === currentSlide) {
                indicator.classList.add('active');
            }
        });
    };

    const nextSlide = () => {
        if (currentSlide === maxSlide) {
            currentSlide = 0;
        } else {
            currentSlide++;
        }
        updateCarousel();
    };

    const prevSlide = () => {
        if (currentSlide === 0) {
            currentSlide = maxSlide;
        } else {
            currentSlide--;
        }
        updateCarousel();
    };

    // Event Listeners for buttons
    btnNext.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });

    btnPrev.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });

    // Event Listeners for indicators
    indicators.forEach(indicator => {
        indicator.addEventListener('click', function() {
            currentSlide = parseInt(this.getAttribute('data-slide'));
            updateCarousel();
            resetAutoSlide();
        });
    });

    // Auto slide functionality
    const startAutoSlide = () => {
        autoSlideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    };

    const resetAutoSlide = () => {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    };

    // Initialize carousel auto-slide
    if (slides.length > 0) {
        startAutoSlide();
    }

    // --- Before & After Interactive Slider ---
    const comparisonSlider = document.querySelector('.comparison-slider');
    if (comparisonSlider) {
        const sliderControl = comparisonSlider.querySelector('.slider-control');
        const beforePane = comparisonSlider.querySelector('.image-before-pane');
        const divider = comparisonSlider.querySelector('.slider-divider');

        const updateSlider = (val) => {
            beforePane.style.width = `${val}%`;
            divider.style.left = `${val}%`;
        };

        // Initialize slider at 50%
        updateSlider(50);

        sliderControl.addEventListener('input', (e) => {
            updateSlider(e.target.value);
        });
    }

    // --- Smile Simulator Logic ---
    const archSvg = document.querySelector('.arch-simulator-svg');
    const btnBite = document.getElementById('btn-bite');
    const btnInvisalign = document.getElementById('btn-invisalign');
    const btnVeneers = document.getElementById('btn-veneers');
    const simState = document.getElementById('sim-state');
    const simMode = document.getElementById('sim-mode');

    if (archSvg) {
        let isBiteOpen = false;
        let isInvisalignActive = false;
        let isVeneersActive = false;
        let idleInterval;

        // Reset/Clear Idle Interval on User Action
        const resetIdleTimer = () => {
            if (idleInterval) {
                clearInterval(idleInterval);
                idleInterval = null;
            }
        };

        // Bite open/close action
        const toggleBite = () => {
            resetIdleTimer();
            isBiteOpen = !isBiteOpen;
            if (isBiteOpen) {
                archSvg.classList.add('bite-open');
                btnBite.classList.add('active');
                simMode.textContent = 'ABERTO';
                simMode.style.color = 'var(--gold-light)';
            } else {
                archSvg.classList.remove('bite-open');
                btnBite.classList.remove('active');
                simMode.textContent = 'RELAXADO';
                simMode.style.color = '';
            }
        };

        btnBite.addEventListener('click', toggleBite);

        // Invisalign Treatment Simulation
        btnInvisalign.addEventListener('click', () => {
            resetIdleTimer();
            isInvisalignActive = !isInvisalignActive;
            
            // Deactivate Veneers if we activate Invisalign
            if (isInvisalignActive) {
                isVeneersActive = false;
                btnVeneers.classList.remove('active');
                archSvg.classList.remove('veneers-active');
                
                archSvg.classList.add('aligner-active');
                archSvg.classList.add('straightened');
                btnInvisalign.classList.add('active');
                simState.textContent = 'INVISALIGN';
                simState.style.color = '#00D2FF'; // Invisalign cyan
            } else {
                archSvg.classList.remove('aligner-active');
                archSvg.classList.remove('straightened');
                btnInvisalign.classList.remove('active');
                simState.textContent = 'NATURAL';
                simState.style.color = 'var(--gold)';
            }
        });

        // Veneers Treatment Simulation
        btnVeneers.addEventListener('click', () => {
            resetIdleTimer();
            isVeneersActive = !isVeneersActive;

            // Deactivate Invisalign if we activate Veneers
            if (isVeneersActive) {
                isInvisalignActive = false;
                btnInvisalign.classList.remove('active');
                archSvg.classList.remove('aligner-active');
                
                archSvg.classList.add('veneers-active');
                archSvg.classList.add('straightened');
                btnVeneers.classList.add('active');
                simState.textContent = 'FACETAS';
                simState.style.color = '#FFF'; // Bright white
            } else {
                archSvg.classList.remove('veneers-active');
                archSvg.classList.remove('straightened');
                btnVeneers.classList.remove('active');
                simState.textContent = 'NATURAL';
                simState.style.color = 'var(--gold)';
            }
        });

        // Subtle idle animation - Gentle breathing of dental arches if user is inactive
        let idleTick = 0;
        idleInterval = setInterval(() => {
            idleTick++;
            // Slowly open and close jaws every few seconds if user hasn't clicked
            if (idleTick % 2 === 1) {
                archSvg.classList.add('bite-open');
                simMode.textContent = 'SIMULAÇÃO';
            } else {
                archSvg.classList.remove('bite-open');
                simMode.textContent = 'RELAXADO';
            }
        }, 5000);
    }
});
