export const initCookieManager = (bannerElement, acceptBtn, rejectBtn, loadScripts) => {
    if (!bannerElement || !acceptBtn || !rejectBtn) {
        console.warn("Elementos de cookies no encontrados.");
        return;
    }

    const consent = localStorage.getItem('userConsent');
    
    if (consent === 'accepted') {
        loadScripts();
    } else if (consent === null) {
        bannerElement.classList.add('is-visible');
    }

    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('userConsent', 'accepted');
        bannerElement.classList.remove('is-visible');
        loadScripts();
    });

    rejectBtn.addEventListener('click', () => {
        localStorage.setItem('userConsent', 'rejected');
        bannerElement.classList.remove('is-visible');
    });
};
