window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 1500);
    }
});

document.addEventListener('DOMContentLoaded', () => {

    // ── Initialise Lucide Icons ──
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // ── Mobile Hamburger Toggle (shows the new mobile-menu panel) ──
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

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
            const isOpen = dd.classList.contains('open');
            document.querySelectorAll('.dropdown.open').forEach(el => el.classList.remove('open'));
            if (!isOpen) dd.classList.add('open');
        });
    });

    // close desktop dropdown when clicking outside
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

    // ── Intersection Observer for Scroll Animations ──
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                entry.target.style.opacity = 1;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate').forEach(el => observer.observe(el));
});
