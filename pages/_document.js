import Document, { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

class MyDocument extends Document { 
    
    render() {
        return (
            <Html lang="en">
                <Head>
                    <Script strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `var PARAMS = {
                        TIMEOUT: 2000, // number of ms to wait before removing the anti-flicker
                        ASYNC_CAMPAIGNS: false, // boolean to wait for async campaigns before removing the anti flicker
                    };
                    var CAMPAIGNS_ASYNC_STATUS = [
                        'pending',
                        'currently_checking',
                        'other_subsegment_is_checking',
                        'target_by_event_pending',
                        'waiting_code_resolution'
                    ];
                    function isACampaignPending() {
                        return Object.keys(window.ABTasty.results).some(function(key) {
                            var data = window.ABTasty.results[key];
                            var status = data.status;
                            return CAMPAIGNS_ASYNC_STATUS.indexOf(status) !== -1;
                        });
                    }
                    function onExecutedCampaign() {
                        if (
                            !PARAMS.ASYNC_CAMPAIGNS ||
                            (PARAMS.ASYNC_CAMPAIGNS && !isACampaignPending())
                        ) {
                            removeAntiFlicker();
                        }
                    }
                    function createAntiFlicker() {
                        return '<div class="abAntiFlicker" style="width: 100vw; height: 100vh; position: fixed; top: 0; left: 0; z-index: 2147483647; pointer-events: none; background-color: rgba(255, 255, 255, 1);"></div>';
                    }
                    function getAntiFlicker() {
                        return document.querySelector('.abAntiFlicker');
                    }
                    function injectAntiFlicker() {
                        if (getAntiFlicker()) return;
                        var antiFlicker = createAntiFlicker();
                        document.querySelector('body').insertAdjacentHTML('beforeend', antiFlicker);
                    }
                    function removeAntiFlicker() {
                        var antiFlicker = getAntiFlicker();
                        if (antiFlicker) antiFlicker.parentNode.removeChild(antiFlicker);
                        window.removeEventListener('abtasty_executedCampaign', onExecutedCampaign);
                        if (timeout) clearTimeout(timeout);
                    }
                    injectAntiFlicker();
                    var timeout = setTimeout(function() {
                        removeAntiFlicker();
                    }, PARAMS.TIMEOUT);
                    window.addEventListener('abtasty_executedCampaign', onExecutedCampaign);`}}>
                    </Script>
                    <Script strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','GTM-TR4C6NR');`}}>
                    </Script>
                    <meta
                    name="description"
                    content="The premiere e-commerce product."
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <body>
                    <noscript dangerouslySetInnerHTML={{ __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TR4C6NR"
                        height="0" width="0" style="display:none;visibility:hidden"></iframe>`}}>
                    </noscript>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
