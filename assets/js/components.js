/**
 * Component Loader - Loads header and footer components dynamically
 * This enables high cohesion and low coupling across all pages
 */

(function () {
    'use strict';

    // Determine base path based on current page location
    function getBasePath() {
        const path = window.location.pathname;
        // If in a subdirectory, adjust the path accordingly
        if (path.includes('/articles/') || path.includes('/pages/')) {
            return '../';
        }
        return '';
    }

    // Load a component into a target element
    async function loadComponent(componentPath, targetId) {
        const target = document.getElementById(targetId);
        if (!target) {
            console.warn(`Target element #${targetId} not found`);
            return;
        }

        try {
            const basePath = getBasePath();
            const response = await fetch(basePath + componentPath);
            if (!response.ok) {
                throw new Error(`Failed to load ${componentPath}: ${response.status}`);
            }
            const html = await response.text();
            target.innerHTML = html;

            // Dispatch event when component is loaded
            target.dispatchEvent(new CustomEvent('componentLoaded', {
                bubbles: true,
                detail: { component: componentPath }
            }));
        } catch (error) {
            console.error(`Error loading component ${componentPath}:`, error);
        }
    }

    // Set active navigation link based on current page
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
        const navLinks = document.querySelectorAll('.nav-link[data-page]');

        navLinks.forEach(link => {
            const page = link.getAttribute('data-page');
            if (currentPage.includes(page) ||
                (page === 'skin-diseases' && currentPage.includes('article'))) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Initialize sticky navigation behavior
    function initStickyNav() {
        const nav = document.querySelector('.sticky-nav');
        if (!nav) return;

        // Check if we need sticky behavior (for pages with header-logo)
        const headerLogo = document.querySelector('.header-logo');
        if (!headerLogo) {
            // Simple header - keep nav scrolled style
            nav.classList.add('scrolled');
            return;
        }

        const threshold = headerLogo.offsetHeight - 100;

        function handleScroll() {
            if (window.scrollY > threshold) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check
    }

    // Initialize mobile menu toggle
    function initMobileMenu() {
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        }
    }

    // Initialize search toggle
    function initSearchToggle() {
        const searchToggle = document.getElementById('searchToggle');
        const inlineSearch = document.getElementById('inlineSearch');

        if (searchToggle && inlineSearch) {
            searchToggle.addEventListener('click', (e) => {
                e.preventDefault();
                inlineSearch.classList.toggle('active');
                if (inlineSearch.classList.contains('active')) {
                    document.getElementById('searchInput')?.focus();
                }
            });
        }
    }

    // Main initialization
    async function init() {
        // Load header component
        await loadComponent('components/header.html', 'header-component');

        // Load footer component
        await loadComponent('components/footer.html', 'footer-component');

        // After components are loaded, initialize functionality
        setTimeout(() => {
            setActiveNavLink();
            initStickyNav();
            initMobileMenu();
            initSearchToggle();
        }, 50);
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
