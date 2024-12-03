document.addEventListener('DOMContentLoaded', () => {
    const toggleLinks = document.querySelectorAll('.toggle-menu');

    toggleLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetSelector = link.getAttribute('data-target');
            const target = document.querySelector(targetSelector);

            if (target) {
                // Toggle submenu
                target.classList.toggle('active');
                const arrow = link.querySelector('.fa');
                if (arrow) {
                    arrow.classList.toggle('fa-chevron-right');
                    arrow.classList.toggle('fa-chevron-down');
                }
            }

            // Allow navigation to the href if it's not just "#"
            const href = link.getAttribute('href');
            if (href && href !== '#') {
                // Allow browser to handle navigation normally
                window.location.href = href;
            }

            // Prevent default only for submenu toggle (not navigation)
            e.preventDefault();
        });
    });
});
