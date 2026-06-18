document.addEventListener("DOMContentLoaded", function() {
    console.debug("Inicializando scripts generales...");
    const config = document.getElementById('chatwoot-config');
    if (!config) {
        console.warn("Elemento 'chatwoot-config' no encontrado, omitiendo inicialización de Chatwoot.");
        return;
    }

    const BASE_URL = config.dataset.baseUrl;
    const WEBSITE_TOKEN = config.dataset.websiteToken;

    window.chatwootSettings = {"position":"right","type":"standard","launcherTitle":""};
    (function(d,t) {
        var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
        g.src=BASE_URL+"/packs/js/sdk.js";
        g.async = true;
        s.parentNode.insertBefore(g,s);
        g.onload=function(){
            console.info("Chatwoot SDK cargado correctamente.");
            window.chatwootSDK.run({
                websiteToken: WEBSITE_TOKEN,
                baseUrl: BASE_URL
            });
            window.openChatwoot = function() {
                if (window.$chatwoot) {
                    console.debug("Abriendo widget de Chatwoot.");
                    window.$chatwoot.toggle("open");
                }
            };
        }
    })(document,"script");
});

// Lógica de Cookies
document.addEventListener("DOMContentLoaded", function() {
    console.debug("Inicializando gestión de cookies...");
    const banner = document.getElementById('cookie-banner');
    if (!banner) {
        console.warn("Elemento 'cookie-banner' no encontrado.");
        return;
    }

    const consent = localStorage.getItem('userConsent');
    console.debug("Estado de consentimiento actual:", consent);

    if (consent === 'accepted') {
        console.info("Consentimiento ya aceptado, cargando scripts...");
        loadThirdPartyScripts();
    } else if (consent === null) {
        console.debug("Mostrando banner de cookies.");
        banner.classList.add('is-visible');
    }

    document.getElementById('accept-cookies').addEventListener('click', function() {
        console.info("Usuario aceptó cookies.");
        localStorage.setItem('userConsent', 'accepted');
        banner.classList.remove('is-visible');
        loadThirdPartyScripts();
    });

    document.getElementById('reject-cookies').addEventListener('click', function() {
        console.info("Usuario rechazó cookies.");
        localStorage.setItem('userConsent', 'rejected');
        banner.classList.remove('is-visible');
    });

    function loadThirdPartyScripts() {
        console.debug("Ejecutando loadThirdPartyScripts...");
        const gaId = window.APP_CONFIG && window.APP_CONFIG.gaId;
        const clarityId = window.APP_CONFIG && window.APP_CONFIG.clarityId;
        console.debug("Configuración detectada - GA:", gaId, "Clarity:", clarityId);
        
        // 1. Cargar Google Analytics
        if (gaId && gaId !== "None") {
            try {
                console.info("Iniciando carga de Google Analytics: " + gaId);
                const script1 = document.createElement("script");
                script1.async = true;
                script1.src = "https://www.googletagmanager.com/gtag/js?id=" + gaId;
                
                script1.onerror = () => console.error("Error crítico al cargar GTAG script desde:", script1.src);
                script1.onload = () => console.debug("Script GTAG cargado y ejecutado.");
                
                document.head.appendChild(script1);
                
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag("js", new Date());
                gtag("config", gaId);
                console.info("Google Analytics configurado.");
            } catch (e) {
                console.error("Fallo crítico al inicializar GTAG:", e);
            }
        } else {
            console.warn("GA ID no válido o no configurado.");
        }

        // 2. Cargar Microsoft Clarity
        if (clarityId && clarityId !== "None") {
            try {
                console.info("Iniciando carga de Clarity: " + clarityId);
                (function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", clarityId);
                console.info("Clarity configurado.");
            } catch (e) {
                console.error("Fallo crítico al inicializar Clarity:", e);
            }
        } else {
            console.warn("Clarity ID no válido o no configurado.");
        }
    }
});

// Lógica del Menú Offcanvas Lateral Móvil (Migración Vue a Vanilla JS)
document.addEventListener('DOMContentLoaded', () => {
    console.debug("Inicializando menú offcanvas lateral...");
    const offcanvas = document.getElementById('mainOffcanvas');
    const toggleBtn = document.querySelector('[data-action="toggle-offcanvas"]');
    const closeElements = document.querySelectorAll('[data-action="close-offcanvas"]');

    if (!offcanvas || !toggleBtn) {
        console.warn("Elementos del offcanvas no encontrados en la página.");
        return;
    }

    function openMenu() {
        console.debug("Abriendo offcanvas.");
        offcanvas.classList.add('is-active');
        offcanvas.setAttribute('aria-hidden', 'false');
        toggleBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        console.debug("Cerrando offcanvas.");
        offcanvas.classList.remove('is-active');
        offcanvas.setAttribute('aria-hidden', 'true');
        toggleBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openMenu();
    });

    closeElements.forEach(el => {
        el.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Cerrar con tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && offcanvas.classList.contains('is-active')) {
            closeMenu();
        }
    });
});
