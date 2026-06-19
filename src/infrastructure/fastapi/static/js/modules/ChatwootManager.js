export const initChatwoot = (configElement) => {
    if (!configElement) {
        console.warn("Elemento 'chatwoot-config' no encontrado.");
        return;
    }

    const BASE_URL = configElement.dataset.baseUrl;
    const WEBSITE_TOKEN = configElement.dataset.websiteToken;

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
            window.openChatwoot = () => window.$chatwoot?.toggle("open");
        }
    })(document,"script");
};
