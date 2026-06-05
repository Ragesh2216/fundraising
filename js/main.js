window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 1000); // reduced delay for snappier premium feel
    }
});

document.addEventListener('DOMContentLoaded', () => {

    // ── Initialise Lucide Icons ──
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // ── Mobile Hamburger Toggle (shows the mobile-menu panel) ──
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.getElementById('mobile-menu');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('hidden');
        });
    }

    // ── Mobile Home Dropdown Toggle ──
    const mobileHomeToggle = document.getElementById('mobile-home-toggle');
    const mobileHomeSubmenu = document.getElementById('mobile-home-submenu');

    if (mobileHomeToggle && mobileHomeSubmenu) {
        mobileHomeToggle.addEventListener('click', () => {
            mobileHomeSubmenu.classList.toggle('hidden');
            mobileHomeToggle.classList.toggle('open');
        });
    }

    // ── Desktop Home Dropdown: click-toggle ──
    document.querySelectorAll('.dropdown').forEach(dd => {
        const trigger = dd.querySelector('.dropdown-trigger');
        if (!trigger) return;
        trigger.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            const isOpen = dd.classList.contains('open');
            document.querySelectorAll('.dropdown.open').forEach(el => el.classList.remove('open'));
            if (!isOpen) dd.classList.add('open');
        });
    });

    // Close desktop dropdown when clicking outside
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown.open').forEach(el => el.classList.remove('open'));
        }
    });

    // ── Smooth Scroll for Anchor Links ──
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    hamburger && hamburger.classList.remove('active');
                }
            }
        });
    });

    // ── Numeric Counter Animation ──
    const runCounterAnimation = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'), 10);
        if (isNaN(target)) return;
        
        const duration = 1500; // 1.5 seconds
        const stepTime = 16; // ~60fps
        const steps = duration / stepTime;
        const increment = target / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current).toLocaleString();
            }
        }, stepTime);
    };

    // ── Intersection Observer for Scroll Animations & Counters ──
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                entry.target.style.opacity = 1;
                
                // If it's a counter or contains counters, run the counter animation
                const counters = entry.target.querySelectorAll('.counter');
                if (counters.length > 0) {
                    counters.forEach(runCounterAnimation);
                } else if (entry.target.classList.contains('counter')) {
                    runCounterAnimation(entry.target);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Observe animate blocks and counters
    document.querySelectorAll('.animate, .counter').forEach(el => {
        observer.observe(el);
    });

    // Handle header opacity on scroll
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.boxShadow = 'var(--shadow-md)';
                header.style.background = 'rgba(255, 255, 255, 0.9)';
            } else {
                header.style.boxShadow = 'none';
                header.style.background = 'rgba(255, 255, 255, 0.8)';
            }
        });
    }
});
