export const initOffcanvasMenu = (offcanvas, toggleBtn, closeElements) => {
    if (!offcanvas || !toggleBtn) {
        console.warn("Elementos del offcanvas no encontrados.");
        return;
    }

    const openMenu = () => {
        offcanvas.classList.add('is-active');
        offcanvas.setAttribute('aria-hidden', 'false');
        toggleBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
        offcanvas.classList.remove('is-active');
        offcanvas.setAttribute('aria-hidden', 'true');
        toggleBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    };

    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openMenu();
    });

    closeElements.forEach(el => el.addEventListener('click', closeMenu));

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && offcanvas.classList.contains('is-active')) {
            closeMenu();
        }
    });
};
