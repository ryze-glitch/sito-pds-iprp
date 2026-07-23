/* =========================================================================
   POLIZIA DI STATO — IPRP — script condiviso da tutte le pagine
   Preloader, smooth scroll (Lenis), animazioni (GSAP), menu mobile.
   Richiede che gsap.min.js, ScrollTrigger.min.js e lenis.min.js siano
   caricati PRIMA di questo file.
   ========================================================================= */

(function () {
    /* ---------- MENU MOBILE ---------- */
    document.addEventListener('DOMContentLoaded', () => {
        const toggle = document.getElementById('navToggle');
        const mobileMenu = document.getElementById('mobileMenu');

        if (toggle && mobileMenu) {
            toggle.addEventListener('click', () => {
                const isOpen = mobileMenu.classList.toggle('open');
                toggle.classList.toggle('open', isOpen);
                toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
                document.body.classList.toggle('menu-open', isOpen);
            });

            mobileMenu.querySelectorAll('a').forEach((a) => {
                a.addEventListener('click', () => {
                    mobileMenu.classList.remove('open');
                    toggle.classList.remove('open');
                    toggle.setAttribute('aria-expanded', 'false');
                    document.body.classList.remove('menu-open');
                });
            });

            document.addEventListener('click', (e) => {
                if (!mobileMenu.classList.contains('open')) return;
                if (mobileMenu.contains(e.target) || toggle.contains(e.target)) return;
                mobileMenu.classList.remove('open');
                toggle.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('menu-open');
            });
        }

        /* ---------- LINK ATTIVO ---------- */
        const current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
        document.querySelectorAll('.nav-center a, .mobile-menu a').forEach((a) => {
            const href = (a.getAttribute('href') || '').split('#')[0].toLowerCase();
            if (href && href === current) a.classList.add('active-link');
        });
    });

    /* ---------- LENIS SMOOTH SCROLL ---------- */
    if (typeof Lenis === 'undefined' || typeof gsap === 'undefined') return;

    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    gsap.registerPlugin(ScrollTrigger);
    lenis.on('scroll', ScrollTrigger.update);

    /* ---------- PRELOADER + REVEAL DI INGRESSO ---------- */
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');

        const tl = gsap.timeline({
            onComplete: () => {
                if (preloader) preloader.style.display = 'none';
                lenis.resize();
                initScrollReveals();
            },
        });

        tl.to('#preload-logo', { autoAlpha: 1, scale: 1, duration: 1, ease: 'back.out(1.5)' })
          .to('#preloader', { autoAlpha: 0, duration: 0.6, ease: 'power2.inOut', delay: 0.3 })
          .to('#navbar', { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
          .fromTo('.hero-item', { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, stagger: 0.12, ease: 'back.out(1.2)' }, '-=0.6');
    });

    /* ---------- ANIMAZIONI ALLO SCROLL ---------- */
    function initScrollReveals() {
        gsap.utils.toArray('.gs-header, .page-anim').forEach((el) => {
            gsap.fromTo(
                el,
                { y: 30, autoAlpha: 0 },
                {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.9,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: el, start: 'top 88%' },
                }
            );
        });

        gsap.utils.toArray('.gs-card').forEach((el, i) => {
            gsap.fromTo(
                el,
                { y: 40, autoAlpha: 0 },
                {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.8,
                    delay: (i % 4) * 0.08,
                    ease: 'back.out(1.2)',
                    scrollTrigger: { trigger: el, start: 'top 90%' },
                }
            );
        });
    }

    /* ---------- NAVBAR: stato "scrolled" ---------- */
    const navWrapper = document.getElementById('navbar');
    if (navWrapper) {
        ScrollTrigger.create({
            start: 'top -80',
            end: 99999,
            onUpdate: (self) => {
                navWrapper.classList.toggle('scrolled', self.scroll() > 80);
            },
        });
    }
})();
