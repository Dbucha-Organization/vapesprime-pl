document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const closeMenu = document.querySelector('.close-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.mobile-menu-overlay');

    function openMenu() {
        mobileMenu.classList.add('open');
        overlay.style.visibility = 'visible';
        overlay.style.opacity = '1';
    }

    function closeMenuFunc() {
        mobileMenu.classList.remove('open');
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.style.visibility = 'hidden';
        }, 300);
    }

    menuToggle.addEventListener('click', openMenu);
    closeMenu.addEventListener('click', closeMenuFunc);
    overlay.addEventListener('click', closeMenuFunc);

    // Scroll effect for header
    const headerWrapper = document.querySelector('.header-wrapper');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            headerWrapper.classList.add('scrolled');
        } else {
            headerWrapper.classList.remove('scrolled');
        }
    });

    // Optional: Close menu on hitting Esc key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMenuFunc();
        }
    });
    // Slider Logic
    const sliderTrack = document.getElementById('sliderTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentIndex = 0;

    if (sliderTrack && prevBtn && nextBtn) {
        const updateSlider = () => {
            const cards = sliderTrack.querySelectorAll('.slider-card');
            if (cards.length === 0) return;

            const cardWidth = cards[0].offsetWidth;
            const gap = 20; // Matches CSS gap
            const moveAmount = cardWidth + gap;

            sliderTrack.style.transform = `translateX(-${currentIndex * moveAmount}px)`;

            // Disable buttons at boundaries
            const visibleCards = Math.round(sliderTrack.parentElement.offsetWidth / cardWidth);
            prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
            prevBtn.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';

            const maxIndex = cards.length - visibleCards;
            nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
            nextBtn.style.pointerEvents = currentIndex >= maxIndex ? 'none' : 'auto';
        };

        nextBtn.addEventListener('click', () => {
            const cards = sliderTrack.querySelectorAll('.slider-card');
            const visibleCards = Math.round(sliderTrack.parentElement.offsetWidth / cards[0].offsetWidth);
            if (currentIndex < cards.length - visibleCards) {
                currentIndex++;
                updateSlider();
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        });

        // Initialize and handle resize
        window.addEventListener('resize', updateSlider);
        // Initial delay to ensure widths are calculated correctly after font/image load
        setTimeout(updateSlider, 500);
    }
    // Dynamic Copyright Year
    const yearSpan = document.getElementById('copyright-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
