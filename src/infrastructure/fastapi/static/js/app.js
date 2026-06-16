document.addEventListener("DOMContentLoaded", function() {
    const config = document.getElementById('chatwoot-config');
    if (!config) return;

    const BASE_URL = config.dataset.baseUrl;
    const WEBSITE_TOKEN = config.dataset.websiteToken;

    window.chatwootSettings = {"position":"right","type":"standard","launcherTitle":""};
    (function(d,t) {
        var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
        g.src=BASE_URL+"/packs/js/sdk.js";
        g.async = true;
        s.parentNode.insertBefore(g,s);
        g.onload=function(){
            window.chatwootSDK.run({
                websiteToken: WEBSITE_TOKEN,
                baseUrl: BASE_URL
            });
            // La forma correcta de abrir Chatwoot es usando window.$chatwoot
            window.openChatwoot = function() {
                if (window.$chatwoot) {
                    window.$chatwoot.toggle("open");
                }
            };
        }
    })(document,"script");
});

// Lógica de Cookies
document.addEventListener("DOMContentLoaded", function() {
    const banner = document.getElementById('cookie-banner');
    if (!banner) return;

    const consent = localStorage.getItem('userConsent');

    if (consent === 'accepted') {
        loadThirdPartyScripts();
    } else if (consent === null) {
        banner.classList.add('is-visible');
    }

    document.getElementById('accept-cookies').addEventListener('click', function() {
        localStorage.setItem('userConsent', 'accepted');
        banner.classList.remove('is-visible');
        loadThirdPartyScripts();
    });

    document.getElementById('reject-cookies').addEventListener('click', function() {
        localStorage.setItem('userConsent', 'rejected');
        banner.classList.remove('is-visible');
    });

    function loadThirdPartyScripts() {
        const config = document.getElementById("cookie-config");
        if (!config) return;
        const gaId = config.dataset.gaId;
        const clarityId = config.dataset.clarityId;
        
        if (gaId && gaId !== "None") {
            console.log("Cargando GA: " + gaId);
            // Implementar carga de GA
        }
        if (clarityId && clarityId !== "None") {
            console.log("Cargando Clarity: " + clarityId);
            // Implementar carga de Clarity
        }
    }
});
