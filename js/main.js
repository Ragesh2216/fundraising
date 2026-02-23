window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 1500);
    }
});

document.addEventListener('DOMContentLoaded', () => {

    // ── Mobile Hamburger Toggle ──
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // ── Home Dropdown: click-toggle on ALL screen sizes ──
    document.querySelectorAll('.nav-dropdown > a').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault(); // prevent navigation; dropdown shows first
            const parent = this.parentElement;
            const isOpen = parent.classList.contains('open');

            // close any other open dropdowns first
            document.querySelectorAll('.nav-dropdown.open').forEach(el => el.classList.remove('open'));

            // toggle current
            if (!isOpen) {
                parent.classList.add('open');
            }
        });
    });

    // close dropdown when clicking outside
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.nav-dropdown')) {
            document.querySelectorAll('.nav-dropdown.open').forEach(el => el.classList.remove('open'));
        }
    });

    // ── Smooth Scroll for Anchor Links ──
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
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
